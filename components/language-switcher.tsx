"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [alignRight, setAlignRight] = useState(true);

  const toggleLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setAlignRight(rect.left + rect.width + 150 > window.innerWidth);
    }
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
<button
  ref={buttonRef}
  onClick={() => setOpen(!open)}
  className={`
    relative p-3 rounded-full bg-white text-[#397a34] border-2 border-[#397a34]
    overflow-hidden
    before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-[#6ab742]/20
    before:transition-all before:duration-300 hover:before:w-full
    transition-all duration-300 hover:text-[#397a34]
    hover:shadow-lg focus:outline-none
  `}
>
  <Globe className="w-5 h-5 relative z-10" />
</button>


      {open && (
        <div
          className={`absolute mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-fade ${
            alignRight ? "right-0" : "left-0"
          }`}
        >
          <button
            onClick={() => toggleLocale("en")}
            className={`w-full text-left px-4 py-2 font-medium hover:bg-[#6ab742]/20 transition ${
              locale === "en" ? "bg-[#6ab742]/20 font-bold" : ""
            }`}
          >
            English
          </button>
          <button
            onClick={() => toggleLocale("ar")}
            className={`w-full text-left px-4 py-2 font-medium hover:bg-[#6ab742]/20 transition ${
              locale === "ar" ? "bg-[#6ab742]/20 font-bold" : ""
            }`}
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
}
