"use client";

import Image from "next/image";
import type { TranslatedMember } from "@/types";

type Props = {
  data: TranslatedMember;
  locale: string;
};

export default function TechnicalTeamMemberCard({ data, locale }: Props) {
  const isArabic = locale === "ar";

  return (
    <>
      <div
        role="button"
        tabIndex={0}
       
        className={`
          bg-white border border-[#6ab742]/30 rounded-xl p-4
          flex items-center gap-4 max-w-xl mx-auto
          hover:shadow-lg transition transform hover:-translate-y-1
         
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
        <div className="flex flex-col justify-center">
        <h4 className="font-bold text-[#397a34] text-lg">{data.name}</h4>
        <p className="text-sm text-gray-600 mt-1">{data.position}</p>
      </div>
      </div>
    </>
  );
}

