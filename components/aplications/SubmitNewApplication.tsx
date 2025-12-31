"use client";
import { applicationSchema } from "@/app/server/applications/validators";
import { Button } from "@/components/ui/button";
import { formData } from "@/data/homedata";
import { NewApplicationForm, NewProgram } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import FormSelect from "../inputs/SelectorInput";
import Button2 from "@/components/ui/Button2"
import {
  saudiCitiesAr,
  saudiCitiesEn,
  educationLevelsAr,
  educationLevelsEn,
} from "@/app/constants/saudiCities";
import DateInput from "../inputs/DateInput";

type Locale = "en" | "ar";

interface Props {
  action: (
    data: NewApplicationForm
  ) => Promise<{ success: boolean; status: number; message: string }>;
  locale: Locale;
  allLifePrograms: NewProgram[];
  allProfessionalPrograms: NewProgram[];
}

export type ApplicationFormValues = z.infer<
  ReturnType<typeof applicationSchema>
>;

export default function ProgramFormPage({
  locale,
  action,
  allLifePrograms,
  allProfessionalPrograms,
}: Props) {
  const isAr = locale === "ar";

  const lifeProgramOptions = (isAr: boolean) => {
    const option = allLifePrograms.map((program) => {
      return {
        label: isAr ? program.program_title_ar : program.program_title_en,
        value: program.id!,
      };
    });

    return option;
  };

  const professionalProgramsOptions = (isAr: boolean) => {
    const options = allProfessionalPrograms.map((program) => {
      return {
        label: isAr ? program.program_title_ar : program.program_title_en,
        value: program.id!,
      };
    });
    return options;
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema(locale)),
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<ApplicationFormValues> = async (data) => {
    console.log("FORM SUBMITTED", data);
    startTransition(async () => {
      try {
        const result = await action(data);
        console.log("result: ", result);

        if (result.status === 201) {
          toast.success(result.message);
           router.push("/");
          return;
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error In Submitting The Application");
      }
    });
  };

  return (
    <section
      className="min-h-screen  py-10 text-gray-900"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6">
        <form
          className=" grid grid-cols-1 md:grid-cols-2 gap-x-10 max-w-full  md:max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-md space-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            register={register("name")}
            label={isAr ? "الأسم كامل" : "Full Name"}
            error={errors.name}
            
          />
          <EmailInput
            register={register("email")}
            label={isAr ? "البريد الإلكتروني" : "Email"}
            error={errors.email}
          />
          <TextInput
            register={register("phone_number")}
            label={isAr ? "رقم الهاتف" : "Phone Number"}
            error={errors.phone_number}
          />
          <TextInput
            register={register("major")}
            label={isAr ? "التخصص" : "Major"}
            error={errors.major}
          />
           <DateInput
            register={register("date_of_birth")}
            label={isAr ? "تاريخ الميلاد" : "Date Of Birth"}
            error={errors.date_of_birth}
            dir={isAr}
          />
          <FormSelect
            options={
              isAr
                ? [
                    { label: "ذكر", value: "male" },
                    { label: "أنثى", value: "female" },
                  ]
                : [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]
            }
            label={isAr ? "الجنس" : "Gender"}
            name="gender"
            error={errors.gender}
            control={control}
            triggerClassName="w-full py-5 "
            placeholder={isAr ?"أختر خيار":"Select Option"}
            dir={isAr}
          />
          <FormSelect
            options={isAr ? saudiCitiesAr : saudiCitiesEn}
            control={control}
            label={isAr ? "المدينة" : "City"}
            name="location"
            error={errors.location}
            triggerClassName="w-full py-5"
            placeholder={isAr ?"أختر خيار":"Select Option"}
            dir={isAr}
          />
          <FormSelect
            options={isAr ? educationLevelsAr : educationLevelsEn}
            label={isAr ? "المستوى التعليمي" : "Education Level"}
            name="education_level"
            error={errors.education_level}
            control={control}
            triggerClassName="w-full py-5"
            placeholder={isAr ?"أختر خيار":"Select Option"}
            dir={isAr}
          />

          <FormSelect
            options={lifeProgramOptions(isAr)}
            label={isAr ? "البرامج الحياتية" : "Life Program"}
            name="life_program_id"
            error={errors.life_program_id}
            control={control}
            triggerClassName="w-full py-5"
            placeholder={isAr ?"أختر خيار":"Select Option"}
            dir={isAr}
          />
          <FormSelect
          
            options={professionalProgramsOptions(isAr)}
            label={isAr ? "البرامج المهنية" : "Professional Program"}
            name="professional_programs_id"
            error={errors.professional_programs_id}
            control={control}
            triggerClassName="w-full"
            placeholder={isAr ?"أختر خيار":"Select Option"}
            dir={isAr}
          />

         

          <div className="border-t pt-6 md:col-span-2">
            <label className="flex items-start gap-3 text-gray-700">
              <input type="checkbox" required className="mt-1" />
              {isAr
                ? "أؤكد أن جميع المعلومات المقدمة دقيقة وصحيحة."
                : "I confirm that all provided information is accurate and correct."}
            </label>
          </div>

          <Button2
            type="submit"
            className="w-full bg-[#397a34] text-white hover:bg-green-700 py-6 text-lg  md:col-span-2"
          >
            {isAr ? "إرسال الطلب" : "Submit Application"}
          </Button2>
        </form>
      </div>
    </section>
  );
}
