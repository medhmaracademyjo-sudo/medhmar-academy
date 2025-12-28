"use client";
import { NewCategory } from "@/types";
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
import { toast } from "sonner";
import z from "zod";
import { categorySchema } from "@/app/server/category/validators";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/inputs/TextInput";
import TextareaInput from "@/components/inputs/TextareaInput";
import { FolderOpen } from "lucide-react";
interface Props {
  category: NewCategory | null;
  action: (
   categoryId:string, data: Partial<NewCategory>
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
type CategoryFormValues = z.infer<typeof categorySchema>;

export default function EditCategoryForm({ category, action }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      category_name_en: category?.category_name_en ?? "",
      category_name_ar: category?.category_name_ar ?? "",
      category_description_en: category?.category_description_en??"",
       category_description_ar: category?.category_description_ar??"",
      logo: category?.logo??"",
    },
    resolver: zodResolver(categorySchema),
  });

  const [isPending, startTransition] = useTransition();

   setValue(
    "slug",
    (watch("category_name_en")??"")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );

  const handleUploadComplete = (url: string) => {
    setValue("logo", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  if (category === null) {
    return (
      <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="flex flex-col items-center text-center">
          <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
          <h3 className="text-gray-600 text-lg font-medium">
            Category Not Found
          </h3>
        </CardContent>
      </Card>
    );
  }

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    startTransition(async () => {
      try {
        const result = await action(category.id??"", data);
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
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit Category</h1>
        <p className="text-xs md:text-base text-gray-600">ID: {category.id}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Edit Category Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to update your category.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
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
              className="md:w-[40vw] w-full"
            />
            <TextareaInput
              register={register("category_description_ar")}
              label="English Description"
              error={errors.category_description_ar}
              className="md:w-[40vw] w-full"
            />
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Category Image</label>
              <ImageUploader
                endpoint="categories"
                initialImageUrl={category.logo}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
            </div>

            <div className="w-full flex justify-center mt-5 ">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    router.replace("/admin/dashboard/category");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#676e32] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#7e8d0d]"
                  disabled={isPending}
                >
                  {isPending ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
