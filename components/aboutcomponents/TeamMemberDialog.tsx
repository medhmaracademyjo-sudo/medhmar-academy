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
}: Props) {
  const fontClass = locale === "ar" ? cairo.className : inter.className

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
<DialogContent
  className={`
    ${fontClass}
    max-w-lg max-h-[80vh] overflow-y-auto
    bg-green-50
    border border-[#6ab742]/30
    rounded-xl shadow-xl
    [&>button]:text-[#397a34]
  `}
>
  <DialogHeader>
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full min-w-0">
      <Image
        src="/placeholder-avatar.png"
        alt={name}
        width={400}
        height={400}
        className="w-20 h-20 rounded-full object-cover border-2 border-[#6ab742] flex-shrink-0"
      />

      <div className="flex flex-col w-full min-w-0 break-words">
        <DialogTitle className="text-lg font-bold text-[#397a34] break-words">
          {name}
        </DialogTitle>
        <DialogDescription className="text-sm text-[#397a34]/80 break-words">
          {role}
        </DialogDescription>
      </div>
    </div>
  </DialogHeader>

  {description && (
    <div className="mt-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
      {description}
    </div>
  )}
</DialogContent>




    </Dialog>
  )
}
