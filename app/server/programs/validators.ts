import {z} from "zod"

export const programsSchema= z.object({
    id:z.string().optional(),
    program_title_en:z.string().min(1,"English program title is requried"),
    program_title_ar:z.string().min(1,"Arabic program title is requried"),
    program_description_en:z.string().min(1,"English description is required").nullable(),
    program_description_ar:z.string().min(1,"Arabic description is required").nullable(),
    program_location_en:z.string().min(1,"English location is required").nullable(),
    program_location_ar:z.string().min(1,"Arabic location is required").nullable(),
    duration_en:z.string().min(1,"English duration is required"),
    duration_ar:z.string().min(1,"Arabic duration is required"),
    slug:z.string().min(1,"Slug is Required"),
    image:z.string().min(1,"Category image is required").nullable(),
    category_id:z.string().min(1,"Category type is required"),
   start_date: z.coerce.date(), // <-- this will convert the string from the input into a Date
  end_date: z.coerce.date(),

})

