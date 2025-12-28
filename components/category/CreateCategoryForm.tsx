"use client";
import { type NewCategory } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageUploader from "@/components/ImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { toast } from "sonner";
import { categorySchema } from "@/app/server/category/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
interface Props {
  action: (
    data: NewCategory
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
type CategoryFormValues = z.infer<typeof categorySchema>;

export default function AddCategoryForm({ action }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUploadComplete = (url: string) => {
    setValue("logo", url, { shouldValidate: true });
  };

  setValue(
    "slug",
    (watch("category_name_en")??"")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    startTransition(async () => {
      try {
        const result = await action(data);
         if (result.status === 401) {
          toast.error(result.message);
          router.push("/login");
          return;
        } else if (result.status === 403) {
          toast.error(result.message);
          router.push("/");
          return;
        } else if (result.status === 201) {
          toast.success(result.message);
          router.push("/admin/dashboard/category");
          return;
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error In Creating The Category");
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[75vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Category</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>New Category Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new category.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7 ">
            <div className="flex flex-col lg:flex-row w-full gap-4">
               <TextInput
              register={register("category_name_en")}
              label="English Name"
              error={errors.category_name_en}
              className="lg:w-[19.5vw] w-full"
            />
            <TextInput
              register={register("category_name_ar")}
              label="Arabic Name"
              error={errors.category_name_ar}
              className="lg:w-[19.5vw] w-full"
            />
            </div>
           
            <TextareaInput
              register={register("category_description_en")}
              label="English Description"
              error={errors.category_description_en}
              className="md:w-[40vw] w-full "
            />
            <TextareaInput
              register={register("category_description_ar")}
              label="Arabic Description"
              error={errors.category_description_ar}
              className="md:w-[40vw] w-full"
            />

            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">
                Category Image
              </label>
              <ImageUploader
                endpoint="categories"
                initialImageUrl={watch("logo")}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
            </div>

            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => router.replace("/admin/dashboard/category")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#676e32] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#89971b]"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add Category"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
