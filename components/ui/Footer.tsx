"use client"
import Image from "next/image"
import logo from "@/public/Logo.png"

export default function Footer() {
  return (
    <footer className="w-full bg-white text-slate-500 pt-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">

        <div className="sm:col-span-2 lg:col-span-1">
          <a href="https://prebuiltui.com" className="inline-block">
            <Image src={logo} alt="Logo" width={40} height={40} className="object-contain"/>
          </a>
          <p className="mt-6 text-sm leading-6">
            PrebuiltUI is a free and open-source UI component library with over 300+ beautifully crafted, customizable components built with Tailwind CSS.
          </p>
        </div>

        <div className="flex flex-col lg:items-center lg:justify-center">
          <div className="flex flex-col text-sm space-y-2.5">
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <a className="hover:text-slate-600 transition" href="#">About us</a>
            <a className="hover:text-slate-600 transition flex items-center gap-1" href="#">
              Careers
              <span className="text-xs text-white bg-[#397a34] rounded-md px-2 py-1">We’re hiring!</span>
            </a>
            <a className="hover:text-slate-600 transition" href="#">Contact us</a>
            <a className="hover:text-slate-600 transition" href="#">Privacy policy</a>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
          <div className="text-sm space-y-6 max-w-sm">
            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
            <div className="flex items-center gap-2 p-2 rounded-md ">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-md py-2 px-2 rounded outline-none ring-2 ring-[#397a34] focus:ring-[#6ab742] bg-white"
              />
              <button className="bg-[#397a34] text-white px-4 py-2 rounded hover:bg-[#6ab742] transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="py-4 text-center border-t mt-6 border-slate-200 text-sm">
        Copyright 2025 © <a href="https://prebuiltui.com" className="hover:underline">PrebuiltUI</a> All Right Reserved.
      </p>
    </footer>
  )
}
