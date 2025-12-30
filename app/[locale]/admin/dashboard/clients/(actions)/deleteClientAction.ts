"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { deleteClient } from "@/app/server/clients/services";

export async function deleteClientAction(clientId:string) {
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
  
      const result = await deleteClient(clientId);
      if (result.status === 201) {
        revalidatePath(`/admin/dashboard/clients`);
      revalidatePath(`/ar/admin/dashboard/clients`);
        return {success:true, message: result.message, status: result.status };
      }
      return {success:false, message: result.message, status: result.status };
    } catch (error) {      
      return {success:false, message: "Error In Deleting Client", status: 500 };
    }
}
