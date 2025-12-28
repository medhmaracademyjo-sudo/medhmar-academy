import {z} from "zod"

export const categorySchema= z.object({
    id:z.string().optional(),
    category_name_en:z.string().min(1,"English Category Name is requried"),
    category_name_ar:z.string().min(1,"Arabic Category Name is requried"),
    category_description_en:z.string().min(1,"English description is required"),
    category_description_ar:z.string().min(1,"Arabic description is required"),
    slug:z.string().min(1,"Slug is Required"),
    logo:z.string().min(1,"Category Is Required")

})