"use client";

import { useForm } from "react-hook-form";
import FormSelect from "../inputs/SelectorInput";
import { Button } from "@/components/ui/button";
import { saudiCitiesEn } from "@/app/constants/saudiCities";
import TextInput from "../inputs/TextInput";

interface Props {
  initialLocation?: string;
  initialGender?: "male" | "female" | null;
  initialMinAge?: number;
  initialMaxAge?: number;
}

export default function ApplicationsFilter({
  initialLocation = "",
  initialGender = null,
  initialMinAge,
  initialMaxAge,
}: Props) {
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      location: initialLocation,
      gender: initialGender,
      minAge: initialMinAge ?? "",
      maxAge: initialMaxAge ?? "",
    },
  });

  const onSubmit = (data: any) => {
    const params = new URLSearchParams();
    if (data.location) params.set("location", data.location);
    if (data.gender) params.set("gender", data.gender);
    if (data.minAge) params.set("minAge", data.minAge);
    if (data.maxAge) params.set("maxAge", data.maxAge);
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 ml-0 mr-0 lg:ml-4 lg:mr-4 "
    >
      <div className="flex flex-wrap gap-4  items-start justify-start">
   <FormSelect
        name="location"
        label="Location"
        control={control}
        options={[
          { label: "All", value: null },
          ...saudiCitiesEn,
        ]}
        
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

      <TextInput label="Min Age" register={register("minAge")}  />
      <TextInput label="Max Age" register={register("maxAge")}  />

      </div>
   
      <div className="flex gap-2 flex-row items-start justify-start">
        <Button type="submit" className="bg-black text-white">
          Apply
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => (window.location.href = window.location.pathname)}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}
