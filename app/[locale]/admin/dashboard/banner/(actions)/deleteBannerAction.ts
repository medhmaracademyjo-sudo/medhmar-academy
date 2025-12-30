"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { deleteBanner } from "@/app/server/banners/services";

export async function deleteBannerAction(bannerId:string) {
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
  
      const result = await deleteBanner(bannerId);
      if (result.status === 201) {
        revalidatePath(`/admin/dashboard/banner`);
      revalidatePath(`/ar/admin/dashboard/banner`);
        return {success:true, message: result.message, status: result.status };
      }
      return {success:false, message: result.message, status: result.status };
    } catch (error) {      
      return {success:false, message: "Error In Deleting Banner", status: 500 };
    }
}
