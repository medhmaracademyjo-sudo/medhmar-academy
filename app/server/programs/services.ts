import prisma from "@/lib/prisma";
import { Locale, NewProgram, translatedProgram } from "@/types";
import { unstable_cache, revalidateTag } from "next/cache";

export const addNewProgram = async (data: NewProgram) => {
  try {
    const result = await prisma.programs.create({
      data,
    });

    revalidateTag("programs", "max");
    return { data: result, message: "Program Added Successfully", status: 201 };
  } catch (error) {
    return { data: error, message: "Error In Adding The Program", status: 500 };
  }
};

export const getAllPrograms = unstable_cache(
  async () => {
    try {
      const result = await prisma.programs.findMany();
      return { data: result, message: "All Programs", status: 200 };
    } catch {
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

export const getProgramsByType = (
  type: "life_programs" | "professional_programs"
) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.programs.findMany({
          where: { program_type: type },
          include: { applications: true },
        });

        return {
          data: result,
          message: "Programs by type fetched",
          status: 200,
        };
      } catch {
        return {
          data: null,
          message: "Error fetching programs by type",
          status: 500,
        };
      }
    },
    [`programs-by-type-${type}`],
    { tags: ["programs"], revalidate: 3600 }
  )();

export const getProgramById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.programs.findUnique({
          where: { id },
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

export const getProgramsByLocale = async (
  locale: Locale,
  program_type?: "life_programs" | "professional_programs"
) => {
  return unstable_cache(
    async () => {
      const result = program_type
        ? await prisma.programs.findMany({ where: { program_type } })
        : await prisma.programs.findMany();

      const translatedPrograms: translatedProgram[] = result.map((program) => ({
        program_title:
          locale === "en" ? program.program_title_en : program.program_title_ar,
        program_description:
          locale === "en"
            ? program.program_description_en
            : program.program_description_ar,

        slug: program.slug,
        image: program.image,
        program_type: program.program_type,
        duration_h: program.duration_h,
        duration_d: program.duration_d,
      }));

      return {
        data: translatedPrograms,
        status: 200,
        message: "Translated programs",
      };
    },
    [`programs-${locale}-${program_type ?? "all"}`],
    { tags: ["programs"], revalidate: 3600 }
  )();
};

export const getProgramBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      try {
        const program = await prisma.programs.findUnique({ where: { slug } });
        if (!program)
          return { data: null, message: "Program not found", status: 404 };

        return {
          data: program,
          message: "Program fetched successfully",
          status: 200,
        };
      } catch {
        return { data: null, message: "Error fetching program", status: 500 };
      }
    },
    [`program-by-slug-${slug}`],
    { tags: ["programs"], revalidate: 3600 }
  )();

export const getProgramBySlugAndLocale = (slug: string, locale: Locale) =>
  unstable_cache(
    async () => {
      try {
        const program = await prisma.programs.findUnique({ where: { slug } });
        if (!program)
          return { data: null, message: "Program not found", status: 404 };

        const translated: translatedProgram = {
          program_title:
            locale === "en"
              ? program.program_title_en
              : program.program_title_ar,
          program_description:
            locale === "en"
              ? program.program_description_en
              : program.program_description_ar,

          slug: program.slug,
          image: program.image,
          program_type: program.program_type,
          duration_h: program.duration_h,
          duration_d: program.duration_d,
        };

        return {
          data: translated,
          message: "Program fetched successfully",
          status: 200,
        };
      } catch {
        return {
          data: null,
          message: "Error fetching program",
          status: 500,
        };
      }
    },
    [`program-by-slug-locale-${slug}-${locale}`],
    { tags: ["programs"], revalidate: 3600 }
  )();

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
  console.log("ffgfgg: ", id);

  try {
    const existing = await prisma.programs.findUnique({ where: { id } });
    console.log("existing: ", existing);

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
    console.log("error: ", error);

    return { data: error, message: "Error deleting program", status: 500 };
  }
};

export const getFeaturedProgramsByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      try {
        const programs = await prisma.programs.findMany({
          where: { feature: true },
        });

        const translatedPrograms: translatedProgram[] = programs.map(
          (program) => ({
            program_title:
              locale === "en"
                ? program.program_title_en
                : program.program_title_ar,
            program_description:
              locale === "en"
                ? program.program_description_en
                : program.program_description_ar,

            slug: program.slug,
            image: program.image,
            program_type: program.program_type,
            duration_h: program.duration_h,
            duration_d: program.duration_d,
          })
        );

        return {
          data: translatedPrograms,
          message: "Featured programs fetched successfully",
          status: 200,
        };
      } catch {
        return {
          data: [],
          message: "Error fetching featured programs",
          status: 500,
        };
      }
    },
    [`featured-programs-${locale}`],
    { tags: ["programs"], revalidate: 3600 }
  )();
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