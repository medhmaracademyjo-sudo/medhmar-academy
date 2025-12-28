"use server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authoptions";
import {  NewCategory } from "@/types";
import { updateCategory } from "@/app/server/category/services";

export async function editCategoryAction(categoryId:string,data: Partial<NewCategory>) {
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

    const result = await updateCategory(categoryId, data);

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/category`);
      return { success: true, message: result.message, status: result.status };
    }
    return { success: false, message: result.message, status: result.status };
  } catch (error) {    
    return {success:false, message: "Error In Updating The Category", status: 500 };
  }
}
