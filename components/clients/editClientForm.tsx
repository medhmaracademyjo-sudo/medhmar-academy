"use client";

import { Clients } from "@/types";
import ImageUploader from "@/components/ImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientsSchema } from "@/app/server/clients/validators";
import { toast } from "sonner";
import TextInput from "../inputs/TextInput";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";

interface Props {
  client: Clients |null;
  action: (clientId:string,data: Clients) => Promise<{success:boolean, message:string, status:number}>;
}

type ClientFormValues = Clients; 

export default function EditClientForm({ client, action }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientsSchema),
    defaultValues: {
      name_en: client?.name_en ?? "",
      name_ar: client?.name_ar ?? "",
      logo: client?.logo ?? "",
    },
  });

  const logoValue = watch("logo");

  const handleUploadComplete = (url: string) => {
    setValue("logo", url, { shouldValidate: true });
    toast.success("Image uploaded");
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
    toast.error(`Upload failed: ${error.message}`);
  };

  const onSubmit: SubmitHandler<ClientFormValues> = async (data) => {
    startTransition(async () => {
      try {
        console.log("data: ",data);
        
       const result= await action(client?.id??"",data);
        if (result.status === 401) {
          toast.error(result.message);
          router.push("/login");
          return;
        } else if (result.status === 403) {
          toast.error(result.message);
          router.push("/");
          return;}
          else if(result.status===201){
 toast.success(result.message);
        setTimeout(() => {
          router.replace("/admin/dashboard/clients");
        }, 500);
          }else {
          toast.error(result.message);
        }
       
      } catch (err) {
        toast.error("Error In Updating The Client");
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit Client</h1>
        <p className="text-xs md:text-base text-gray-600">
          ID: {client?.id}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full pt-5">
          <CardHeader>
            <CardTitle>Edit Client Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to update your Client.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Name */}
              <TextInput
                         register={register("name_en")}
                         label="English Name"
                         error={errors.name_en}
                         className="w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw]"
                       />
                        <TextInput
                         register={register("name_ar")}
                         label="Arabic Name"
                         error={errors.name_ar}
                         className="w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw]"
                       />
           

            {/* Logo */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Client Logo</label>
              <ImageUploader
                endpoint="categories"
                initialImageUrl={logoValue}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                // If supported:
                // onDelete={() => setValue("logo", "")}
              />
              {errors.logo && (
                <p className="text-red-600 text-sm mt-1">
                  Logo Is Required
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <Button1
                  type="button"
                  onClick={() => router.replace("/admin/dashboard/clients")}
                >
                  Cancel
                </Button1>

                <Button2
                  type="submit"
                  disabled={isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? "Updating..." : "Save Changes"}
                </Button2>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
