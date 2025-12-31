import {z} from "zod"

export const programsSchema= z.object({
    id:z.string().optional(),
    program_title_en:z.string().min(1,"English program title is requried"),
    program_title_ar:z.string().min(1,"Arabic program title is requried"),
    program_description_en:z.string().min(1,"English description is required").nullable(),
    program_description_ar:z.string().min(1,"Arabic description is required").nullable(),
    duration_h:z.string().min(1,"Duration(Hours) is required"),
    duration_d:z.string().min(1,"Duration(Days) is required"),
    slug:z.string().min(1,"Slug is Required"),
    image:z.string().min(1,"Program image is required").nullable(),
     program_type: z.enum(["life_programs", "professional_programs"]),
     feature:z.boolean()

})

