"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { newSetting } from "@/types";
import { addNewSetting } from "@/app/server/settings/services";

export async function createSettingAction(data: newSetting) {
 const session = await getServerSession(authOptions);

  try {
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

    const result = await addNewSetting(data);
    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/settings`);
      revalidatePath(`/ar/admin/dashboard/settings`);
      return { success:true,message: result.message, status: result.status };
    }
    return { success:false,message: result.message, status: result.status };
    
  } catch (error) {
    console.log("error in setting: ",error);
    
     return {success:false, message: "Error In Creating The Setting", status: 500 };
  }
    
  

  // Successful Cearte
  
}
