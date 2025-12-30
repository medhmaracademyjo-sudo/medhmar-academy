"use server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authoptions";
import { Partners } from "@/types";
import { updatePartner } from "@/app/server/partners/services";

export async function editpartnerAction(partnerId:string,data: Partial<Partners>) {
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

    const result = await updatePartner(partnerId, data);

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/partners`);
      revalidatePath(`/ar/admin/dashboard/partners`);
      return { success: true, message: result.message, status: result.status };
    }
    return { success: false, message: result.message, status: result.status };
  } catch (error) {
    console.log("description_ar:banner?.description_ar??",error);
    
    return {success:false, message: "Error In Updating The Partner", status: 500 };
  }
}
