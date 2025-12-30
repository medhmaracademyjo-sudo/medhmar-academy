"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { addPartner } from "@/app/server/partners/services";
import { Partners } from "@/types/index";

export async function addpartnerAction(data: Partners) {
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

    const result = await addPartner(data);

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/partners`);
      revalidatePath(`/ar/admin/dashboard/partners`);

      return { success: true, message: result.message, status: result.status };
    }
    return { success: false, message: result.message, status: result.status };
  } catch (error) {
    console.log("lkdfj error: 0:", error);

    return { success: false, message: "Error In Adding partners", status: 500 };
  }
}
