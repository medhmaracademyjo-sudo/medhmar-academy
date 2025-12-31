"use client";

import { useState } from "react";
import TeamMemberDialog from "./TeamMemberDialog";
import { TranslatedMember } from "@/types";
import Image from "next/image";
type Props = {
  data: TranslatedMember;
  locale: string;
};

export default function TeamMemberCard({ data, locale }: Props) {
  const [open, setOpen] = useState(false);
console.log("datre: ",data);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="
          bg-green-50 rounded-xl p-6 text-center
          border border-[#6ab742]/30
          hover:shadow-lg transition transform hover:-translate-y-1
          cursor-pointer
        "
      >
        <div
          className="
            w-36 h-36 mx-auto mb-4 rounded-full
            bg-[#6ab742]/20 border border-[#6ab742]/30
            flex items-center justify-center
            text-sm text-gray-500 font-medium
          "
        >
          <Image
            src={data.image??"/placeholder-avatar.png"}
            alt={data.name}
            width={160}
            height={160}
            className="w-20 h-20 rounded-full object-contain  border-2 border-[#6ab742] shadow-sm shrink-0"
          />{" "}
        </div>

        <h4 className="font-bold text-[#397a34] text-lg flex flex-row justify-center">{data.name}</h4>
        <p className="text-sm text-gray-600 mt-2 flex flex-row justify-center">{data.position}</p>
      </div>

      <TeamMemberDialog
        open={open}
        onOpenChange={setOpen}
        name={data.name}
        role={data.position}
        image= {data.image??""}
        description={data.description ?? ""}
        locale={locale}
      />
    </>
  );
}
