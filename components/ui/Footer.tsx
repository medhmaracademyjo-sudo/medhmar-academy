"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import {
  SiFacebook,
  SiLinkedin,
  SiYoutube,
  SiInstagram,
  SiX,
} from "react-icons/si";
import { Copyright, Mail, Phone } from "lucide-react";

type Props = {
  locale?: string;
};

export default function Footer({ locale = "en" }: Props) {
  const isArabic = locale === "ar";

  const LIFE_ROUTE = "/programs/life-programs";
  const PROFESSIONAL_ROUTE = "/programs/professional-programs";
  const ABOUT_ROUTE = "/about";
  const MISSION_ROUTE = "/mission-vision";

  const EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@example.com";
  const PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+962-0000-0000";

  const SOCIAL_X = process.env.NEXT_PUBLIC_SOCIAL_X || "#";
  const SOCIAL_YT = process.env.NEXT_PUBLIC_SOCIAL_YT || "#";
  const SOCIAL_FB = process.env.NEXT_PUBLIC_SOCIAL_FB || "#";
  const SOCIAL_IG = process.env.NEXT_PUBLIC_SOCIAL_IG || "#";

  const NUREMBERG_URL = process.env.NEXT_PUBLIC_NUREMBERG_URL || "#";
  const POWERED_BY_NAME =
    process.env.NEXT_PUBLIC_POWERED_BY_NAME || "Nuremberg Group";

  const year = 2026;

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full bg-white text-slate-700 pt-10 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href={ABOUT_ROUTE}
            className="inline-flex items-center justify-center"
          >
            <Image
              src={Logo}
              alt="logo"
              width={80}
              height={60}
              className="object-contain"
            />
          </Link>
          <p className="mt-6 text-lg leading-7">
            {isArabic
              ? "مبادرة إتقان مبادرة وطنية لتمكين الشباب عبر برامج مهنية وحياتية تعزز الجاهزية لسوق العمل وبناء مجتمع منتج."
              : "Etqana Initiative is a national initiative empowering youth through professional and life-skills programs for workforce readiness."}
          </p>
        </div>

        {/* Second column: Programs & pages */}
        <div className="flex flex-col lg:items-start lg:justify-start lg:pt-11">
          <div className="flex flex-col text-lg space-y-3">
            <h2 className="font-semibold mb-3 text-gray-800">
              {isArabic ? "البرامج" : "Programs & About"}
            </h2>
            <Link
              href={LIFE_ROUTE}
              className="hover:text-slate-600 transition text-lg"
            >
              {isArabic ? "برنامج الحياة" : "Life program"}
            </Link>
            <Link
              href={PROFESSIONAL_ROUTE}
              className="hover:text-slate-600 transition text-lg"
            >
              {isArabic ? "البرامج المهنية" : "Professional programs"}
            </Link>
            <Link
              href={ABOUT_ROUTE}
              className="hover:text-slate-600 transition text-lg"
            >
              {isArabic ? "من نحن" : "About"}
            </Link>
            <Link
              href={MISSION_ROUTE}
              className="hover:text-slate-600 transition text-lg"
            >
              {isArabic ? "المهمة والرؤية" : "Mission & Vision"}
            </Link>
          </div>
        </div>

        {/* Third column: Contact (aligned like Programs & Logo) */}
        <div className="flex flex-col lg:items-start lg:justify-start lg:pt-11">
          <h2
            className={`font-semibold text-gray-800 mb-4 text-lg flex flex-row justify-start 
    ${isArabic ? "text-right lg:text-right" : "text-left lg:text-left"}
  `}
          >
            {isArabic ? "تواصل معنا" : "Contact us"}
          </h2>

          <div className="text-lg space-y-4 max-w-sm flex flex-col items-start">
            {/* Email */}
            <div className="flex items-center gap-2 rtl:gap-2 rtl:flex-row-reverse">
              <Mail size={22} className="shrink-0" />
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg font-medium hover:text-slate-600 transition wrap-break-word text-center"
                aria-label={`Email ${EMAIL}`}
              >
                {EMAIL}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 rtl:gap-2 rtl:flex-row-reverse">
              <Phone size={22} className="shrink-0" />
              <a
                dir="ltr"
                href={`tel:${PHONE}`}
                className="text-lg font-medium hover:text-slate-600 transition text-center"
              >
                {PHONE}
              </a>
            </div>

            {/* Social icons */}
            <div className=" flex items-center gap-4 rtl:flex-row-reverse">
              <Link
                href={SOCIAL_FB}
                target="_blank"
                className="hover:text-slate-600 transition"
                aria-label="Facebook"
              >
                <SiFacebook size={32} />
              </Link>

              <Link
                href={SOCIAL_IG}
                target="_blank"
                className="hover:text-slate-600 transition"
                aria-label="Instagram"
              >
                <SiInstagram size={32} />
              </Link>
              <Link
                href={SOCIAL_X}
                target="_blank"
                className="hover:text-slate-600 transition"
                aria-label="X"
              >
                <SiX size={32} />
              </Link>

              <Link
                href={SOCIAL_YT}
                target="_blank"
                className="hover:text-slate-600 transition"
                aria-label="YouTube"
              >
                <SiYoutube size={32} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-8 border-t mb-4 border-slate-200 flex justify-center text-center px-4">
        <p className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-base leading-relaxed">
          <span className="flex items-center gap-1"></span>

          {isArabic ? (
            <span className="flex flex-wrap justify-center items-center gap-1">
              <Copyright width={15} height={15} />
              {year}
              Etqansa. جميع الحقوق محفوظة • مدعوم من
              <a
                href={NUREMBERG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-600"
              >
                {POWERED_BY_NAME}
              </a>
            </span>
          ) : (
            <span className="flex flex-wrap justify-center items-center gap-1">
              <Copyright width={15} height={15} />
              {year}
              Etqansa. All rights reserved. Powered by
              <a
                href={NUREMBERG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-600"
              >
                {POWERED_BY_NAME}
              </a>
            </span>
          )}
        </p>
      </div>
    </footer>
  );
}
