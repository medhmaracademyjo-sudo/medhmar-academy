"use server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authoptions";
import { NewBanner } from "@/types";
import { updateBanner } from "@/app/server/banners/services";

export async function editBannerAction(bannerId:string,data: Partial<NewBanner>) {
  try {
    const session = await getServerSession(authOptions);
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

    const result = await updateBanner(bannerId, data);

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/banner`);
      revalidatePath(`/ar/admin/dashboard/banner`);
      return { success: true, message: result.message, status: result.status };
    }
    return { success: false, message: result.message, status: result.status };
  } catch (error) {
    console.log("description_ar:banner?.description_ar??",error);
    
    return {success:false, message: "Error In Updating The Banner", status: 500 };
  }
}
