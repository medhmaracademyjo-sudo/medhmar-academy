"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { newSetting } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newSettingSchema } from "@/app/server/settings/validators";
import { toast } from "sonner";
import TextareaInput from "../inputs/TextareaInput";
import TextInput from "../inputs/TextInput";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";
const formSchema = z
  .object({ id: z.string().optional() })
  .merge(newSettingSchema);

export type FormSchema = z.infer<typeof formSchema>;

interface Option {
  value: string;
  label: string;
  type: "text" | "number" | "textarea" | "image" | "video";
  placeholder?: string;
}

interface Props {
  action: (
    data: newSetting
  ) => Promise<{ success: boolean; message: string; status: number }>;
  existingKeys?: string[];
  options?: Option[];
}

export default function CreateNewSetting({
  action,
  existingKeys = [],
  options,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploadingEn, setIsUploadingEn] = useState(false);
  const [isUploadingAr, setIsUploadingAr] = useState(false);

  const defaultOptions: Option[] = [
    {
      value: "number_of_students",
      label: "Number Of Students",
      type: "number",
      placeholder: "",
    },
    {
      value: "number_of_programs",
      label: "Number Of Programs",
      type: "number",
      placeholder: "",
    },
    {
      value: "number_of_instructors",
      label: "Number Of Instructors",
      type: "number",
      placeholder: "",
    },
    {
      value: "mission_in_about",
      label: "Mission In About",
      type: "textarea",
      placeholder: "",
    },
    {
      value: "vision_in_about",
      label: "Vision In About",
      type: "textarea",
      placeholder: "",
    },
  ];

  const availableOptions = options ?? defaultOptions;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key_name_en: "",
      key_name_ar: "",
      value_en: "",
      value_ar: "",
    },
  });

  const watchedKey = watch("key_name_en");

  useEffect(() => {
    setValue("value_en", "");
    setValue("value_ar", "");
    setValue("key_name_ar", "");
    clearErrors();
  }, [watchedKey, setValue, clearErrors]);

  const remainingOptions = availableOptions.filter(
    (opt) => !existingKeys.includes(opt.value)
  );

  if (remainingOptions.length === 0) {
    return (
      <main className="ml-3 xl:ml-7 mb-7">
        <div className="flex flex-col justify-start items-start w-[70vw] mb-7">
          <h1 className="text-lg md:text-2xl font-bold">Add New Setting</h1>
        </div>

        <div className="text-gray-600 text-lg font-medium">
          ✅ All settings have already been added. There are no more fields
          available to create.
        </div>

        <div className="w-full flex justify-center my-5">
          <button
            onClick={() => router.push("/admin/dashboard/settings")}
            className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition mt-28"
          >
            Back to Settings
          </button>
        </div>
      </main>
    );
  }

  const onSubmit = async (data: FormSchema) => {
    if (existingKeys.includes(data.key_name_en)) {
      setError("key_name_en", { message: "This key already exists" });
      return;
    }

    startTransition(async () => {
      try {
        const payload: newSetting = {
          key_name_en: String(data.key_name_en ?? ""),
          key_name_ar: String(data.key_name_ar ?? ""),
          value_en: String(data.value_en ?? ""),
          value_ar: String(data.value_ar ?? ""),
        };

        const result = await action(payload);
        if (result.status === 401) {
          toast.error(result.message);
          router.push("/login");
        } else if (result.status === 403) {
          toast.error(result.message);
          router.push("/");
        } else if (result.status === 201) {
          toast.success(result.message);
          setTimeout(() => {
            router.replace("/admin/dashboard/settings");
          }, 1000);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error("Failed to add Setting.");
      }
    });
  };

  const selected = availableOptions.find((o) => o.value === watchedKey);
  const inputWidthClass = "w-[90vw] md:w-[75vw] lg:w-[55vw] xl:w-[30vw]";
  const textareaWidthClass = "w-[90vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw]";

  const renderValueInput = () => {
    if (!selected)
      return (
        <div className="text-sm text-gray-500">
          Choose a key above to enter the appropriate value.
        </div>
      );

    switch (selected.type) {
      case "text":
        return (
          <>
            <TextInput
              register={register("key_name_en")}
              error={errors.value_en}
              label=""
            />
            {/*<input
              type="text"
              {...register("value_en")}
              className={`border px-2 py-1 rounded border-black bg-white ${inputWidthClass} h-[5vh] text-black`}
              placeholder={selected.placeholder ?? ""}
            />
            {errors.value_en && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value_en.message}
              </p>
            )}*/}
          </>
        );

      case "number":
        return (
          <>
            {/* <TextInput
              register={register("key_name_en")}
              error={errors.value_en}
              label=""
            />*/}
            <input
              type="number"
              {...register("value_en")}
              className={`border px-2 py-1 rounded border-black bg-white ${inputWidthClass} h-[5vh] text-black`}
              placeholder={selected.placeholder ?? ""}
            />
            {errors.value_en && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value_en.message}
              </p>
            )}
          </>
        );

      case "textarea":
        return (
          <>
            <TextareaInput
              register={register("value_en")}
              label=""
              error={errors.value_en}
              className=""
            />
            {/* <textarea
              {...register("value_en")}
              className={`border px-2 py-1 rounded border-black bg-white ${textareaWidthClass} h-[15vh] text-black`}
            />
            {errors.value_en && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value_en.message}
              </p>
            )*/}
          </>
        );

      default:
        return null;
    }
  };

  const renderArabicInput = () => {
    if (!selected) {
      return (
        <div className="text-sm text-gray-500">
          Choose a key above to enter the appropriate value for Arabic.
        </div>
      );
    }

    if (selected.type === "text") {
      return (
        <>
          <input
            type="text"
            dir="rtl"
            {...register("value_ar")}
            className={`border px-2 py-1 rounded border-black bg-white ${inputWidthClass} h-[5vh] text-right`}
            placeholder={selected.placeholder ?? ""}
          />
          {errors.value_ar && (
            <p className="text-red-500 text-sm mt-1">
              {errors.value_ar.message}
            </p>
          )}
        </>
      );
    }

    if (selected.type === "textarea") {
      return (
        <>
          <TextareaInput
            register={register("value_en")}
            label=""
            error={errors.value_en}
            className=""
          />
          {/* <textarea
            dir="rtl"
            {...register("value_ar")}
            className={`border px-2 py-1 rounded border-black bg-white ${textareaWidthClass} h-[15vh] text-right`}
          />
          {errors.value_ar && (
            <p className="text-red-500 text-sm mt-1">
              {errors.value_ar.message}
            </p>
          )}*/}
        </>
      );
    }

    return null;
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Setting</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full pt-10">
          <CardHeader>
            <CardTitle>New Setting Details</CardTitle>
            <CardDescription>
              Pick a setting key and provide its value (all values stored as
              strings).
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Select key */}
            <div className="flex flex-col gap-3">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Setting Key
              </label>

              <Select
                value={watchedKey}
                onValueChange={(v) => {
                  setValue("key_name_en", v);
                  setValue("key_name_ar", "");
                  setValue("value_en", "");
                  setValue("value_ar", "");
                  clearErrors();
                }}
              >
                <SelectTrigger className="w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[30vw] border border-black text-black">
                  <SelectValue placeholder="Select setting key" />
                </SelectTrigger>

                <SelectContent>
                  {remainingOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.key_name_en && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.key_name_en.message}
                </p>
              )}
            </div>

            {/* English value input */}
            <div className="flex flex-col mt-2">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Value (English)
              </label>
              <div className="mt-1">{renderValueInput()}</div>
            </div>

            {/* Arabic value input */}
            {selected &&
              (selected.type === "text" || selected.type === "textarea") && (
                <div className="flex flex-col mt-2">
                  <label className="text-base text-black mb-1">
                    <span className="text-red-500 text-sm">*</span> Value
                    (Arabic)
                  </label>
                  <div className="mt-1">{renderArabicInput()}</div>
                </div>
              )}

            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <Button1
                  type="button"
                  onClick={() => router.replace("/admin/dashboard/settings")}
                >
                  Cancel
                </Button1>
                <Button2
                  type="submit"
                  disabled={
                    isSubmitting || isPending || isUploadingEn || isUploadingAr
                  }
                >
                  {" "}
                  {isPending
                    ? "Adding..."
                    : isUploadingEn || isUploadingAr
                    ? "Uploading..."
                    : "Add Setting"}
                </Button2>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
