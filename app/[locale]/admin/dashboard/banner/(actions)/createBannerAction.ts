"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { addNewBanner } from "@/app/server/banners/services";
import { type NewBanner } from "@/types/index";

export async function createBannerAction(data: NewBanner) {
  try {
    const session = await getServerSession(authOptions);
    // ❗ Not logged in
    if (!session) {
      return {
        success:false,
        status: 401,
        message: "Please log in first.",
      };
    }

    // ❗ Not admin
    if (session.user.role !== "admin") {
      return {
        success:false,
        status: 403,
        message: "You are not allowed to perform this action.",
      };
    }

    const result = await addNewBanner(data);

    

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/banner`);
      revalidatePath(`/ar/admin/dashboard/banner`);
      return { success:true,message: result.message, status: result.status };
    }
    return { success:false,message: result.message, status: result.status };

  } catch (error) {
    console.log("lkdfj error: 0:",error);
    
    return {success:false, message: "Error In Adding Banner", status: 500 };
  }
}
