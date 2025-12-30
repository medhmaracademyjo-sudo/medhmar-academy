"use client";
import { type NewMember } from "@/types";
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
import { NewMemberSchema } from "@/app/server/our_team/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";
import FormSelect from "../inputs/SelectorInput";
interface Props {
    member:NewMember | null
  action: (
    memberId:string,
    data: NewMember
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
type MembersFormValues = z.infer<typeof NewMemberSchema>;


export default function EditMemberForm({ action,member }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<MembersFormValues>({
    resolver: zodResolver(NewMemberSchema),
    defaultValues:{
        name_en: member?.name_en,
        name_ar: member?.name_ar,
        description_en:member?.description_en ??"",
        description_ar:member?.description_ar ??"",
        member_type:member?.member_type??undefined,
        position_en:member?.position_en,
        position_ar:member?.position_ar,
        image:member?.image
    }
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  const onSubmit: SubmitHandler<MembersFormValues> = async (data) => {
    startTransition(async () => {
      try {
        const result = await action(member?.id??"",data);
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
          router.push("/admin/dashboard/ourTeam");
          return;
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error In Creating The Member");
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[75vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Member</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Edit Member Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to update a new member.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7 ">
            <FormSelect
            name="member_type"
            error={errors.member_type}
                placeholder="Select Member Type"
                triggerClassName="w-full text-md"
                className="lg:w-[19.5vw] w-full"
            label=" Member Type"
              control={control}
              options={[
                {
                  label: "Founder",
                  value: "founder",
                },
                {
                  label: "Life Programs",
                  value: "life_programs",
                },
                {
                  label: "Professional Programs",
                  value: "professional_programs",
                },
              ]}
            />
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <TextInput
                register={register("name_en")}
                label="Name (EN)"
                error={errors.name_en}
                className="lg:w-[19.5vw] w-full"
              />
              <TextInput
                register={register("name_ar")}
                label="Name (AR)"
                error={errors.name_ar}
                className="lg:w-[19.5vw] w-full"
              />
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <TextInput
                register={register("position_en")}
                label="Position (EN)"
                error={errors.position_en}
                className="lg:w-[19.5vw] w-full"
              />
              <TextInput
                register={register("position_ar")}
                label="Position (AR)"
                error={errors.position_ar}
                className="lg:w-[19.5vw] w-full"
              />
            </div>
            <TextareaInput
              register={register("description_en")}
              label="English Description"
              error={errors.description_en}
              className="md:w-[40vw] w-full "
            />
            <TextareaInput
              register={register("description_ar")}
              label="Arabic Description"
              error={errors.description_ar}
              className="md:w-[40vw] w-full"
            />
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Member Image</label>
              <ImageUploader
                endpoint="ourTeam"
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
            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <Button1 type="button"
                  onClick={() => router.replace("/admin/dashboard/ourTeam")}>Cancel</Button1>
                <Button2 type="submit"
                  disabled={isPending}> {isPending ? "Saving..." : "Save Change"}</Button2>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
