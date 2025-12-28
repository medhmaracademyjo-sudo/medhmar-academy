import prisma from "@/lib/prisma";
import { Locale, NewCategory } from "@/types/index";
import { revalidateTag, unstable_cache } from "next/cache";

export const addNewCategory = async (data: NewCategory) => {
  try {
    const result = await prisma.category.create({
      data: {
        category_name_en: data.category_name_en,
        category_name_ar: data.category_name_ar,
        category_description_en: data.category_description_en,
        category_description_ar: data.category_description_ar,
        logo: data.logo,
        slug: data.slug,
      },
    });

    revalidateTag("category", "max");
    return {
      data: result,
      message: "Category Added Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Adding The Category",
      status: 500,
    };
  }
};

export const getAllCategories = unstable_cache(
  async () => {
    try {
      const result = await prisma.category.findMany();
      return {
        data: result,
        message: "Categories fetched successfully",
        status: 200,
      };
    } catch (error) {
      return { data: [], message: "Error fetching categories", status: 500 };
    }
  },
  ["all-categories"],
  { tags: ["categories"], revalidate: 3600 }
);

export const getAllCategoriesWithPrograms = unstable_cache(
  async () => {
    try {
      const result = await prisma.category.findMany({include:{programs:true}});
      return {
        data: result,
        message: "Categories With Programs fetched successfully",
        status: 200,
      };
    } catch (error) {
      return { data: [], message: "Error Fetching  Categories With Programs", status: 500 };
    }
  },
  ["all-categories-with-programs"],
  { tags: ["categories"], revalidate: 3600 }
);

export const getAllCategoriesIdAndName=async ()=>{
   try {
      const result = await prisma.category.findMany({select:{id:true,category_name_en:true}});
      return {
        data: result,
        message: "Categories Id And Name fetched successfully",
        status: 200,
      };
    } catch (error) {
      return { data: [], message: "Error fetching categories", status: 500 };
    }
}

export const getCategoryById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.category.findUnique({ where: { id } });
        if (!result)
          return { data: null, message: "Category not found", status: 404 };
        return {
          data: result,
          message: "Category fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching category", status: 500 };
      }
    },
    [`category-by-id-${id}`],
    { tags: ["categories"], revalidate: 3600 }
  );

  return cachedFn();
};

export const getCategoryBySlug = (slug: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.category.findUnique({ where: { slug } });
        if (!result)
          return { data: null, message: "Category not found", status: 404 };
        return {
          data: result,
          message: "Category fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching category", status: 500 };
      }
    },
    [`category-by-slug-${slug}`],
    { tags: ["categories"], revalidate: 3600 }
  );

  return cachedFn();
};

export const updateCategory = async (
  id: string,
  data: Partial<NewCategory>
) => {
  try {
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing)
      return { data: null, message: "Category not found", status: 404 };

    const result = await prisma.category.update({ where: { id }, data });
    revalidateTag("categories", "max");
    return {
      data: result,
      message: "Category updated successfully",
      status: 201,
    };
  } catch (error) {
    return { data: error, message: "Error updating category", status: 500 };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing)
      return { data: null, message: "Category not found", status: 404 };

    const result = await prisma.category.delete({ where: { id } });
    revalidateTag("categories", "max");
    return {
      data: result,
      message: "Category deleted successfully",
      status: 201,
    };
  } catch (error) {
    return { data: error, message: "Error deleting category", status: 500 };
  }
};

export const allCategoriesByLocale = unstable_cache(async()=>{
    async (locale: Locale) => {

  const allCategories = (await getAllCategories()).data;

  const translatedCategories = allCategories.map((category) => {
    return {
        category_name:
          locale === "en"
            ? category.category_name_en
            : category.category_name_ar,
        logo: category.logo,
        slug: category.slug,
        category_description:
          locale === "en"
            ? category.category_description_en
            : category.category_description_ar,
      
    };
  });

  return { 
    data:translatedCategories, message:"Translated Categories", status:200
  }
};

})