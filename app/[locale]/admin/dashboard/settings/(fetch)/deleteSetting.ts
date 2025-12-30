"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { deleteSetting } from "@/app/server/settings/services";

export async function deleteSettingAction(settingId: string) {
  const session = await getServerSession(authOptions);

  try {
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
  } catch (error) {}
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
  const result = await deleteSetting(settingId);
  if (result?.status === 201) {
    revalidatePath(`/admin/dashboard/settings`);
      revalidatePath(`/ar/admin/dashboard/settings`);
    return { success: true, message: result.message, status: result.status };
  }
  return { success: false, message: result?.message, status: result?.status };
}
