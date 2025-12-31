"use client";
import { NewProgram } from "@/types";
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
import { programsSchema } from "@/app/server/programs/validators";
import { SubmitHandler, useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/inputs/TextInput";
import TextareaInput from "@/components/inputs/TextareaInput";
import { FolderOpen } from "lucide-react";
import FormSelect from "../inputs/SelectorInput";
import CheckboxInput from "../inputs/CheckBox";
import { saudiCitiesAr, saudiCitiesEn } from "@/app/constants/saudiCities";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";
interface Props {
  program: NewProgram | null;
  action: (
    programId: string,
    data: Partial<NewProgram>
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
type ProgramFormValues = z.infer<typeof programsSchema>;

export default function EditProgramForm({
  program,
  action,
  
}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ProgramFormValues>({
    defaultValues: {
      program_title_en: program?.program_title_en ?? "",
      program_title_ar: program?.program_title_ar ?? "",
      program_description_en: program?.program_description_en ?? "",
      program_description_ar: program?.program_description_ar ?? "",
      image: program?.image ?? "",
      duration_h: program?.duration_h ?? "",
      duration_d: program?.duration_d ?? "",
      feature:program?.feature??false,
      slug: program?.slug ?? "",
      program_type: program?.program_type,
    },
    resolver: zodResolver(
      programsSchema
    ) as unknown as Resolver<ProgramFormValues>,
  });

 
  const [isPending, startTransition] = useTransition();

  setValue(
    "slug",
    (watch("program_title_en") ?? "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );

  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  if (program === null) {
    return (
      <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="flex flex-col items-center text-center">
          <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
          <h3 className="text-gray-600 text-lg font-medium">
            Program Not Found
          </h3>
        </CardContent>
      </Card>
    );
  }

  const onSubmit: SubmitHandler<ProgramFormValues> = async (data) => {
    startTransition(async () => {
      try {
        const result = await action(program.id ?? "", data);
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
          router.push("/admin/dashboard/program");
          return;
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error In Creating The Program");
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit Program</h1>
        <p className="text-xs md:text-base text-gray-600">ID: {program.id}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full pt-10">
          <CardHeader>
            <CardTitle>Edit Program Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to update your program.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7 ">
            <div className="flex flex-col w-full max-w-sm">
              <FormSelect
                name="program_type"
                label="Program Type"
                control={control}
                 options={[{
                  label:"Life Programs",
                  value:"life_programs"
                },{
                  label:"Professional Programs",
                  value:"professional_programs"
                }]}
                error={errors.program_type}
                placeholder="Select category"
                triggerClassName="w-full text-md"
              />
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <TextInput
                register={register("program_title_en")}
                label="English Title"
                error={errors.program_title_en}
                className=" lg:w-[19.5vw] w-full "
              />
              <TextInput
                register={register("program_title_ar")}
                label="Arabic Title"
                error={errors.program_title_ar}
                className="lg:w-[19.5vw] w-full"
              />
            </div>

            <TextareaInput
              register={register("program_description_en")}
              label="English Description"
              error={errors.program_description_en}
              className="md:w-[40vw] w-full "
            />
            <TextareaInput
              register={register("program_description_ar")}
              label="Arabic Description"
              error={errors.program_description_ar}
              className="md:w-[40vw] w-full"
            />
           <div className="flex flex-col lg:flex-row w-full gap-4">
                         <TextInput
                           register={register("duration_d")}
                           label="Duration (Days)"
                           error={errors.duration_d}
                           className="lg:w-[19.5vw] w-full"
                         />
                         <TextInput
                           register={register("duration_h")}
                           label="Duration (Hours)"
                           error={errors.duration_h}
                           className="lg:w-[19.5vw] w-full"
                         />
                       </div>
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Program Image</label>
              <ImageUploader
                endpoint="categories"
                initialImageUrl={watch("image")}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
               {errors.image && (
                <p className={`mt-1 text-xs text-red-600 `}>
                  Image Is Required
                </p>
              )}
            </div>
             <CheckboxInput register={register("feature")} label="Feature Program?" error={errors.feature}/>

            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <Button1
                                  type="button"
                                  onClick={() => router.replace("/admin/dashboard/program")}
                                >
                                  Cancel
                                </Button1>
                                <Button2 type="submit" disabled={isPending}>
                                  {isPending ? "Saving..." : "Save Change"}
                                </Button2>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
