"use server";
import { addNewApplcation } from "@/app/server/applications/services";
import { NewApplicationForm } from "@/types";

export const newApplicationAction = async (data: NewApplicationForm) => {
  try {
    console.log("test action");

    const result = await addNewApplcation({
      name: data.name,
      gender: data.gender,
      phone_number: data.phone_number,
      location: data.location,
      date_of_birth: new Date(data.date_of_birth),
      education_level: data.education_level,
      email: data.email,
      major: data.major,
      life_program_id: data.life_program_id,
      professional_programs_id: data.professional_programs_id,
    });

    if (result.status === 201)
      return {
        success: true,
        status: 201,
        message: "Application Submitted Successfully",
      };

    return {
      success: false,
      status: result.status,
      message: result.message
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Error In Submitting The Application",
    };
  }
};
