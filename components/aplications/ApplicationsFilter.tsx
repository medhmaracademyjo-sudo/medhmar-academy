"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import FormSelect from "../inputs/SelectorInput";
import { saudiCitiesEn } from "@/app/constants/saudiCities";
import TextInput from "../inputs/TextInput";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";

interface Props {
  initialLocation?: string;
  initialGender?: "male" | "female" | null;
  initialMinAge?: number;
  initialMaxAge?: number;
  initialApplicationId?: string;
}

interface ApplicationsFilterFormValues {
  location: string;
  gender: "male" | "female" | null;
  minAge: number | "";
  maxAge: number | "";
  applicationId: string;
}

export default function ApplicationsFilter({
  initialLocation = "",
  initialGender = null,
  initialMinAge,
  initialMaxAge,
  initialApplicationId,
}: Props) {
  const { handleSubmit, control, register } =
    useForm<ApplicationsFilterFormValues>({
      defaultValues: {
        location: initialLocation,
        gender: initialGender,
        minAge: initialMinAge ?? "",
        maxAge: initialMaxAge ?? "",
        applicationId: initialApplicationId ?? "",
      },
    });

  const onSubmit: SubmitHandler<ApplicationsFilterFormValues> = (data) => {
    const params = new URLSearchParams();

    if (data.location) params.set("location", data.location);
    if (data.gender) params.set("gender", data.gender);
    if (data.minAge !== "") params.set("minAge", String(data.minAge));
    if (data.maxAge !== "") params.set("maxAge", String(data.maxAge));
    if (data.applicationId) params.set("applicationId", data.applicationId);

    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 ml-0 mr-0 lg:ml-4 lg:mr-4"
    >
      <div className="flex flex-wrap gap-4 items-start justify-start">
        <FormSelect
          name="location"
          label="Location"
          control={control}
          options={[{ label: "All", value: null }, ...saudiCitiesEn]}
        />

        <FormSelect
          name="gender"
          label="Gender"
          control={control}
          options={[
            { label: "All", value: null },
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />

        <TextInput
          label="Min Age"
          register={register("minAge")}
          className="sm:w-[20vw] md:w-[15vw] lg:w-[10vw]"
        />
        <TextInput
          label="Max Age"
          register={register("maxAge")}
          className="sm:w-[20vw] md:w-[15vw] lg:w-[10vw]"
        />
        <TextInput
          label="Id"
          register={register("applicationId")}
          className="sm:w-[35vw] md:w-[30vw] lg:w-[25vw]"
        />
      </div>

      <div className="flex gap-2 flex-row items-start justify-start">
        <Button2 type="submit">Apply</Button2>

        <Button1
          type="button"
          onClick={() => (window.location.href = window.location.pathname)}
        >
          Clear
        </Button1>
      </div>
    </form>
  );
}
