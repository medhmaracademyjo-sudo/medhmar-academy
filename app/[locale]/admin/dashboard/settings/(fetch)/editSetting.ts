"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { newSetting } from "@/types";
import { editSetting } from "@/app/server/settings/services";

export async function editSettingAction(settingId: string, data: newSetting) {
  const session = await getServerSession(authOptions);

  try {
    // ❗ Not logged in
    if (!session) {
      return {
        success: false,
        status: 401,
        message: "Please log in first.",
      };
    }

    // ❗ Not admin
    if (session.user.role !== "admin") {
      return {
        success: false,
        status: 403,
        message: "You are not allowed to perform this action.",
      };
    }

    const result = await editSetting(settingId, data);
    if (result.status === 201) 
      revalidatePath(`/admin/dashboard/settings`);
      revalidatePath(`/ar/admin/dashboard/settings`);
    return {
      success: true,
      message: "Setting updated successfully",
      status: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Updating The Setting",
      status: 500,
    };
  }
}
