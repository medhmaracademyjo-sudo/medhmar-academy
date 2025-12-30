import Image from "next/image"
import whitelogo2 from "@/public/whitelogo2.png"

export default function HeroSection({ isAr }: { isAr: boolean }) {
  return (
    <section className="relative py-32 bg-[#397a34] text-white text-center overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl centert font-extrabold mb-6">
          {isAr ? "رسالتنا ورؤيتنا" : "Mission & Vision"}
        </h1>
        <p className="text-lg md:text-xl centert opacity-90 mb-8">
          {isAr
            ? "تمكين الأفراد من بناء مستقبل مهني وحياتي مستدام، وتعزيز ثقافة العمل المنتج والابتكار، بما يسهم في تحسين جودة الحياة ودعم التنمية المجتمعية الشاملة"
            : "Empowering individuals to build a sustainable professional and life future, promoting a culture of productive work and innovation, contributing to quality of life and comprehensive community development"}
        </p>
     
      </div>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image src={whitelogo2} alt="Logo" fill className="object-contain" />
      </div>
    </section>
  )
}
