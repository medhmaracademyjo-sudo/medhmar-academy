"use client"

import Image from "next/image"
import { Inter, Cairo } from "next/font/google"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const inter = Inter({ subsets: ["latin"] })
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"] })

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  role: string
  image:string
  description?: string
  locale: string
}

export default function TeamMemberDialog({
  open,
  onOpenChange,
  name,
  role,
  description,
  locale,
  image
}: Props) {
  const isArabic = locale === "ar"
  const fontClass = isArabic ? cairo.className : inter.className

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isArabic ? "rtl" : "ltr"}
        className={`
          ${fontClass}
          w-[min(92vw,42rem)]
          h-[70vh]
          overflow-hidden
          rounded-2xl
          bg-linear-to-b from-green-50 to-white
          border border-[#6ab742]/30
          shadow-2xl
          p-0
          [&>button]:text-[#397a34]
        `}
      >
        {/* Thin scrollbar styles (WebKit + Firefox) */}
        <style jsx>{`
          .scroll-area::-webkit-scrollbar { width: 8px; }
          .scroll-area::-webkit-scrollbar-thumb {
            background: rgba(58,142,52,0.25);
            border-radius: 9999px;
          }
          .scroll-area { scrollbar-width: thin; scrollbar-color: rgba(58,142,52,0.25) transparent; }
        `}</style>

        {/* IMPORTANT: min-h-0 allows the scrollable child to calculate its height */}
        <div className="flex flex-col h-full min-h-0">

          {/* ===== Header (fixed) ===== */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#6ab742]/20" >
            <div
              className={`flex items-center gap-4 w-full min-w-0 `}
            >
              {/* avatar wrapper */}
              <div className={isArabic ? "sm:ml-4 sm:mr-0" : "sm:mr-4 sm:ml-0"}>
                <Image
                  src={image??"/placeholder-avatar.png"}
                  alt={name}
                  width={160}
                  height={160}
                  className="w-20 h-20 rounded-full object-contain border-2 border-[#6ab742] shadow-sm shrink-0"
                />
              </div>

              <div className={`flex flex-col min-w-0 ${isArabic ? "text-right" : "text-left"}`}>
                <DialogTitle className="text-lg font-bold text-[#2f6f2a] wrap-break-word">
                  {name}
                </DialogTitle>
                <DialogDescription className="text-sm text-[#397a34]/80 wrap-break-word">
                  {role}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          
          <div className="flex-1 overflow-y-auto px-6 py-5 scroll-area min-h-0">
            {description ? (
              <p
                className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line wrap-break-word ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {description}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                {isArabic ? "لا يوجد وصف متاح" : "No description available."}
              </p>
            )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
