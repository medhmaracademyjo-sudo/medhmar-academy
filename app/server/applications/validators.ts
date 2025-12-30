import { z } from "zod";
import { Locale } from "@/types/index";

export const applicationSchema = (locale: Locale) =>
  z.object({
    name: z
      .string()
      .min(1, locale === "en" ? "Name is required" : "الاسم مطلوب"),
      gender: z.enum(["male", "female"]),
    email: z
      .string()
      .min(1, locale === "en" ? "Email is required" : "البريد الإلكتروني مطلوب")
      .email(
        locale === "en" ? "Invalid email address" : "البريد الإلكتروني غير صالح"
      ),

    phone_number: z
      .string()
      .min(1, locale === "en" ? "Phone number is required" : "رقم الهاتف مطلوب"),

    location: z
      .string()
      .min(1, locale === "en" ? "Location is required" : "الموقع مطلوب"),

    education_level: z
      .string()
      .min(
        1,
        locale === "en"
          ? "Education level is required"
          : "المستوى التعليمي مطلوب"
      ),

    life_program_id: z
      .string()
      .min(1, locale === "en" ? "Life Program is required" : "البرنامج الحياتي مطلوب"),
      professional_programs_id: z
      .string()
      .min(1, locale === "en" ? "Professional Program is required" : "البرنامج مهني مطلوب"),

    major: z
      .string()
      .min(1, locale === "en" ? "Major is required" : "التخصص مطلوب"),

    date_of_birth: z
      .string()
      .min(
        1,
        locale === "en" ? "Date of birth is required" : "تاريخ الميلاد مطلوب"
      ),
  });
