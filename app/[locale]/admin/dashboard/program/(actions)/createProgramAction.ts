"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import {  NewProgram } from "@/types/index";
import { addNewProgram } from "@/app/server/programs/services";

export async function createProgramAction(data: NewProgram) {
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

    const result = await addNewProgram(data);

    

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/program`);
      revalidatePath(`/ar/admin/dashboard/program`);
      return { success:true,message: result.message, status: result.status };
    }
    return { success:false,message: result.message, status: result.status };

  } catch (error) {
    console.log("lkdfj error: 0:",error);
    
    return {success:false, message: "Error In Adding Program", status: 500 };
  }
}
