"use client";
import { type NewBanner } from "@/types";
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
import { bannerSchema } from "@/app/server/banners/validators";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/inputs/TextInput";
import TextareaInput from "@/components/inputs/TextareaInput";
import { FolderOpen } from "lucide-react";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";
interface Props {
  banner: NewBanner | null;
  action: (
   bannerId:string, data: Partial<NewBanner>
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
type BannerFormValues = z.infer<typeof bannerSchema>;

export default function EditBannerForm({ banner, action }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BannerFormValues>({
    defaultValues: {
      description_en: banner?.description_en ?? "",
      description_ar: banner?.description_ar ?? "",
      name: banner?.name,
      image: banner?.image,
    },
    resolver: zodResolver(bannerSchema),
  });

  const [isPending, startTransition] = useTransition();

  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  if (banner === null) {
    return (
      <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="flex flex-col items-center text-center">
          <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
          <h3 className="text-gray-600 text-lg font-medium">
            Banner Not Found
          </h3>
        </CardContent>
      </Card>
    );
  }

  const onSubmit: SubmitHandler<BannerFormValues> = async (data) => {
    startTransition(async () => {
      try {
        const result = await action(banner.id??"", data);
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
          router.push("/admin/dashboard/banner");
          return;
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error In Updating The Banner");
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit Banner</h1>
        <p className="text-xs md:text-base text-gray-600">ID: {banner.id}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full pt-10">
          <CardHeader>
            <CardTitle>Edit Banner Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to update your banner.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            <TextInput
              register={register("name")}
              label="Name"
              className="md:w-[20vw] w-full"
            />
            <TextareaInput
              register={register("description_en")}
              label="English Description"
              error={errors.description_en}
              className="md:w-[40vw] w-full"
            />
            <TextareaInput
              register={register("description_ar")}
              label="Arabic Description"
              error={errors.description_ar}
              className="md:w-[40vw] w-full"
            />

            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Banner Image</label>
              <ImageUploader
                endpoint="banners"
                initialImageUrl={banner.image}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.image && (
                <p className={`mt-1 text-xs text-red-600 `}>
                  Image Is Required
                </p>
              )}
            </div>

            <div className="w-full flex justify-center mt-5 ">
              <div className="flex flex-row gap-3">
                <Button1
                type="button"
                                  onClick={() => router.replace("/admin/dashboard/banner")}
                                >
                                  Cancel
                                </Button1>
                
                                <Button2 type="submit" disabled={isPending}>
                                  {isPending ? "Updating..." : "Save Changes"}
                                </Button2>
             
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
