import { z } from "zod";

export const NewMemberSchema = z.object({
  id: z.string().optional(), 
  name_en: z.string().min(1, "English name is required"),
  name_ar: z.string().min(1, "Arabic name is required"),
  description_en: z.string().nullable(),
  description_ar: z.string().nullable(),
  position_en: z.string().min(1, "English position is required"),
  position_ar: z.string().min(1, "Arabic position is required"),
  display_order: z.number().int().nonnegative().nullable().optional(),
  member_type: z.enum(["founder", "life_programs", "professional_programs"]),
  image: z.string().nullable(), 
});
