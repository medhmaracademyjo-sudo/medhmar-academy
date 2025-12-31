import Image from "next/image"
import whitelogo from "@/public/whitelogo.png"

export default function AboutHero({ isAr }: { isAr: boolean }) {
  return (
    <section className="relative overflow-hidden bg-[#397a34] py-28 px-6 text-white flex flex-col items-center justify-center">
      <div className="container mx-auto relative z-10 text-center max-w-3xl pb-5">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 centert">
          {isAr ? "من نحن" : "About Us"}
        </h1>

        <p className="text-lg md:text-xl opacity-90 leading-relaxed centert" >
          {isAr
            ? "منصة تعليمية تهدف إلى تمكين الأفراد من اكتساب مهارات جديدة بسهولة."
            : "An educational platform focused on empowering people with modern and practical skills."}
        </p>
      </div>

  

      <div className="absolute top-1/2 right-0 transform -rotate-12 -translate-y-1/2 translate-x-1/4 opacity-20 w-40 h-40 md:w-[900px] md:h-[900px] pointer-events-none">
        <Image src={whitelogo} alt="Logo" fill className="object-contain" />
      </div>
    </section>
  )
}
