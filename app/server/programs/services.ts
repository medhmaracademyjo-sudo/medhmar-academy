import prisma from "@/lib/prisma";
import { Locale, type NewProgram } from "@/types/index";
import { revalidateTag, unstable_cache } from "next/cache";

export const addNewProgram = async (data: NewProgram) => {
  try {
    const result = await prisma.programs.create({
    data: {
      ...data,
      start_date: new Date(data.start_date!),
      end_date: new Date(data.end_date!)
    }
  })
  revalidateTag("categories","max");
    revalidateTag("programs", "max");
    return {
      data: result,
      message: "Program Added Successfully",
      status: 201,
    };
  } catch (error) {
    console.log("error",error);
    
    return {
      data: error,
      message: "Error In Adding The program",
      status: 500,
    };
  }
};

export const getAllPrograms = unstable_cache(
  async () => {
    try {
      const result = await prisma.programs.findMany({
        include: { category: true },
      });
      return {
        data: result,
        message: "All Programs",
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error In Getting All Programs",
        status: 500,
      };
    }
  },
  ["all-programs"],
  { tags: ["programs"], revalidate: 3600 }
);

export const getProgramById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.programs.findUnique({
          where: { id },
          include: { category: true },
        });
        if (!result)
          return { data: null, message: "Program not found", status: 409 };
        return {
          data: result,
          message: "Program fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching program", status: 500 };
      }
    },
    [`program-by-id-${id}`],
    { tags: ["programs"], revalidate: 3600 }
  );

  return cachedFn();
};

export const getProgramNameAndIdById= (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.programs.findUnique({
          where: { id },
          select:{id:true, program_title_en:true}
        });
        if (!result)
          return { data: null, message: "Program not found", status: 409 };
        return {
          data: result,
          message: "Program fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching program", status: 500 };
      }
    },
    [`program-name-by-id-${id}`],
    { tags: ["programs"], revalidate: 3600 }
  );

  return cachedFn();
};

export const getProgramBySlug = (slug: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.programs.findUnique({
          where: { slug },
          include: { category: true },
        });
        if (!result)
          return { data: null, message: "Program not found", status: 409 };
        return {
          data: result,
          message: "Program fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching program", status: 500 };
      }
    },
    [`program-by-slug-${slug}`],
    { tags: ["programs"], revalidate: 3600 }
  );

  return cachedFn();
};

export const updateProgram = async (id: string, data: Partial<NewProgram>) => {
  try {
    const existing = await prisma.programs.findUnique({ where: { id } });
    if (!existing)
      return { data: null, message: "Program not found", status: 409 };

    const result = await prisma.programs.update({ where: { id }, data });
    revalidateTag("categories", "max");
    revalidateTag("programs", "max");
    return {
      data: result,
      message: "Program updated successfully",
      status: 201,
    };
  } catch (error) {
    return { data: error, message: "Error updating program", status: 500 };
  }
};

export const deleteProgram = async (id: string) => {
  try {
    const existing = await prisma.programs.findUnique({ where: { id } });
    if (!existing)
      return { data: null, message: "Program not found", status: 409 };

    const result = await prisma.programs.delete({ where: { id } });
    revalidateTag("programs", "max");
    return {
      data: result,
      message: "Program deleted successfully",
      status: 201,
    };
  } catch (error) {
    return { data: error, message: "Error deleting program", status: 500 };
  }
};

export const getProgramsByLocale = async (locale: Locale) => {
  unstable_cache(async () => {
    const allPrograms = (await getAllPrograms()).data;

    if (allPrograms === null) return null;

    const translatedPrograms = allPrograms.map((progrm) => {
      return {
        program_title:
          locale === "en" ? progrm.program_title_en : progrm.program_title_ar,
        program_description:
          locale === "en"
            ? progrm.program_description_en
            : progrm.program_description_ar,
        program_location:
          locale === "en"
            ? progrm.program_location_en
            : progrm.program_location_ar,
        duration: locale === "en" ? progrm.duration_en : progrm.duration_ar,
        slug: progrm.slug,
        image: progrm.image,
        category_id: progrm.category_id,
        start_date: progrm.start_date,
        end_date: progrm.end_date,
      };
    });
    return {
      data: translatedPrograms,
      message: "All Translated Programs",
      status: 200,
    };
  });
};
