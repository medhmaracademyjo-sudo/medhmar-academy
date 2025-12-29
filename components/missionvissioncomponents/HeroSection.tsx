import Image from "next/image"
import whitelogo2 from "@/public/whitelogo2.png"

export default function HeroSection({ isAr }: { isAr: boolean }) {
  return (
    <section className="relative py-32 bg-[#397a34] text-white text-center overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          {isAr
            ? "رسالتنا ورؤيتنا وقيمنا وأهدافنا"
            : "Mission, Vision, Values & Objectives"}
        </h1>

        <p className="text-lg md:text-xl opacity-90 mb-8">
          {isAr
            ? "نؤمن بأن التعليم والأهداف الواضحة هما مفتاح مستقبل أفضل."
            : "We believe education and clear objectives are the key to a better future."}
        </p>

        <button className="bg-white text-[#397a34] px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition">
          {isAr ? "ابدأ الآن" : "Get Started"}
        </button>
      </div>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image src={whitelogo2} alt="Logo" fill className="object-contain" />
      </div>
    </section>
  )
}
