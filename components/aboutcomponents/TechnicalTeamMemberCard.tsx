"use client";

import { useState } from "react";
import Image from "next/image";
import TeamMemberDialog from "./TeamMemberDialog";
import type { TranslatedMember } from "@/types";

type Props = {
  data: TranslatedMember;
  locale: string;
};

export default function TechnicalTeamMemberCard({ data, locale }: Props) {
  const [open, setOpen] = useState(false);
  const isArabic = locale === "ar";

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        className={`
          bg-white border border-[#6ab742]/30 rounded-xl p-4
          flex items-center gap-4 max-w-xl mx-auto
          hover:shadow-lg transition transform hover:-translate-y-1
          cursor-pointer
          ${isArabic ? "flex-row-reverse" : "flex-row"}
        `}
        aria-label={`${data.name} - ${data.position}`}
      >
        {/* avatar */}
        <div className="w-24 h-24 rounded-full bg-[#6ab742]/20 border border-[#6ab742]/30 flex items-center justify-center text-sm text-gray-500 font-medium shrink-0 overflow-hidden">
          <Image
            src={data.image ?? "/placeholder-avatar.png"}
            alt={data.name}
            width={96}
            height={96}
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>

        {/* text */}
        <div className={`flex flex-col justify-center min-w-0 ${isArabic ? "text-right" : "text-left"}`}>
          <h4 className="font-bold text-[#397a34] text-lg truncate">{data.name}</h4>
          <p className="text-sm text-gray-600 mt-1 truncate">{data.position}</p>
        </div>
      </div>

      <TeamMemberDialog
        open={open}
        onOpenChange={setOpen}
        name={data.name}
        role={data.position}
        description={data.description ?? ""}
        locale={locale}
        image={data.image??""}
      />
    </>
  );
}
