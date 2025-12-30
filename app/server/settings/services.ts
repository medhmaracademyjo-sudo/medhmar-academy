"use server";

import prisma from "@/lib/prisma";
import { newSetting } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";

type Locale = "en" | "ar";

export const addNewSetting = async (data: newSetting) => {
  try {
    const result = await prisma.settings.create({ data});
    revalidateTag("settings", "max");
    return {
      data: result,
      message: "Setting added successfully",
      status: 201,
    };
  } catch (error) {
    console.error("addNewSetting error:", error);
    return {
      data: null,
      message: "Error adding new setting",
      status: 500,
    };
  }
};

export const getSettingsData = unstable_cache(
  async () => {
    try {
      const result = await prisma.settings.findMany();
      return result;
    } catch (error) {
      console.error("getSettingsData error:", error);
      return [];
    }
  },
  ["all-settings"],
  { tags: ["settings"], revalidate: 3600 }
);

export const getSettingById = async (id: string) => {
  try {
    const setting = await prisma.settings.findUnique({ where: { id } });
    return setting;
  } catch (error) {
    console.error("getSettingById error:", error);
    return null;
  }
};

export const editSetting = async (id: string, modifiedSettings: newSetting) => {
  try {
    const existing = await prisma.settings.findUnique({ where: { id } });
    if (!existing) return {
success: false,
        message: "Setting not found",
        status: 409,
    };

     await prisma.settings.update({
      where: { id },
      data: {
        key_name_en: modifiedSettings.key_name_en ?? existing.key_name_en,
        key_name_ar: modifiedSettings.key_name_ar ?? existing.key_name_ar,
        value_en: modifiedSettings.value_en ?? existing.value_en,
        value_ar: modifiedSettings.value_ar ?? existing.value_ar,
      },
    });

    revalidateTag("settings", "max");
    return {
  success:true,
      message: "Setting updated successfully",
      status: 201,
    };
  } catch (error) {
    console.error("editSetting error:", error);
     return {
  success:false,
      message: "Error In Updating Setting ",
      status: 500,
    };;
  }
};

export const deleteSetting = async (id: string) => {
  try {
    const existing = await prisma.settings.findUnique({ where: { id } });
    if (!existing)
      return {
         success: false,
        message: "Setting not found",
        status: 409,
      };

    await prisma.settings.delete({ where: { id } });
    revalidateTag("settings", "max");

    return {
      success: true,
      message: "Setting deleted successfully",
      status: 201,
    };
  } catch (error) {
    console.error("deleteSetting error:", error);
    return { success: false,
      message: "Error In Deleting Setting",
      status: 500,};
  }
};


export const getSettingByLocale = async (
  locale: Locale,
  fieldName: string
): Promise<{ name: string | null; value: string | null } | null> => {
  return unstable_cache(
    async () => {
      const settings = await getSettingsData();

      const selected = settings.find(
        (s) => s.key_name_en === fieldName
      );

      if (!selected) return null;

      return {
        name: locale === "ar"
          ? selected.key_name_ar
          : selected.key_name_en,
        value: locale === "ar"
          ? selected.value_ar
          : selected.value_en,
      };
    },
    [`get-settings-by-${locale}-${fieldName}`],
    {
      tags: ["settings"],
      revalidate: 3600, 
    }
  )(); 
};

export const getSettingByFieldName = async (
  fieldName: string
): Promise<{ name: string | null; value: string | null } | null> => {
  return unstable_cache(
    async () => {
      const settings = await getSettingsData();

      const selected = settings.find(
        (s) => s.key_name_en === fieldName
      );

      if (!selected) return null;

      return {
        name: selected.key_name_en,
        value: selected.value_en,
      };
    },
    [`get-settings-by-${fieldName}`],
    {
      tags: ["settings"],
      revalidate: 3600, 
    }
  )(); 
};

