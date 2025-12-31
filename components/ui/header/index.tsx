"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import LanguageSwitcher from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import Button2 from "@/components/ui/Button2";

import Logo from "@/public/Logo.png";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const navItems = [
    { key: "home", href: "/" },
    { key: "missionvision", href: "/mission-vision" },
    { key: "about", href: "/about" },
  ];

  const programItems = [
    { key: "program1", href: "/programs/professional-programs" },
    { key: "program2", href: "/programs/life-programs" },
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-background/95 backdrop-blur px-5">
        <nav className="container mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-2xl font-extrabold tracking-tight text-primary shrink-0"
          >
            <img src={Logo.src} alt="Logo" width={40} height={40} />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors px-2 py-2 ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}

            <li className="relative group">
              <span className="flex items-center gap-1 cursor-pointer text-sm font-medium text-muted-foreground px-2 py-2 hover:text-primary">
                {t("programs")}
                <ChevronDown className="h-4 w-4" />
              </span>
              <ul className="absolute top-full mt-2 w-60 rounded-xl border border-black/10 bg-background shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {programItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-sm hover:bg-accent transition-colors"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Enroll Button */}
            <Link href="/programs/form" className="hidden md:inline-flex">
              <Button2 className="px-6 py-3 text-base">                              {t("button")}
</Button2>
            </Link>

            {/* Language Switcher */}
            <div className="hidden md:inline-flex">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/20"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-green-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#397a34]/30">
          <span className="font-bold text-lg text-[#397a34]">
          <div className="mt-4 px-4">
            <LanguageSwitcher />
          </div></span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="text-[#397a34]" />
          </Button>
        </div>

        <nav className="p-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-[#397a34] hover:text-[#FDE68A] hover:bg-green-100 transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}

          <div className="mt-4 border-t border-[#397a34]/30 pt-4">
            <p className="px-4 py-2 text-xs font-semibold uppercase text-[#397a34]">
              {t("programs")}
            </p>
            {programItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-6 py-3 text-sm text-[#397a34] hover:text-[#FDE68A] hover:bg-green-100 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          <Link href="/programs/form" onClick={() => setOpen(false)}>
            <Button2 >
                              {t("button")}

            </Button2>
          </Link>

        </nav>
      </div>
    </>
  );
}
