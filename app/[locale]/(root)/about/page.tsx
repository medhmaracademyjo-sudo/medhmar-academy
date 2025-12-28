import Image from "next/image"
import whitelogo from "@/public/whitelogo.png"

type Locale = "en" | "ar"

interface PageProps {
  params: {
    locale: Locale
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const isAr = locale === "ar"

  return (
    <div
      className="min-h-screen bg-green-50 text-gray-900"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#397a34] py-28 px-6 text-white flex flex-col items-center justify-center" >
        <div className="container mx-auto relative z-10 text-center max-w-3xl pb-5">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            {isAr ? "من نحن" : "About Us"}
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            {isAr
              ? "منصة تعليمية تهدف إلى تمكين المتعلمين من اكتساب مهارات جديدة بسهولة."
              : "An educational platform focused on empowering learners with modern and practical skills."}
          </p>
        </div>

           <button className="bg-white  text-[#397a34] px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-100 transition">
      {isAr ? 'ابدأ الآن' : 'Get Started'}
    </button>
      <div className="absolute top-1/2 right-0 transform -rotate-12 -translate-y-1/2 translate-x-1/4 z-0 opacity-20 w-40 h-40 md:w-[900px] md:h-[900px] pointer-events-none">
    <Image
      src={whitelogo} 
      alt="Logo Pattern"
      className="object-contain"
      fill
    />
  </div>
      </section>

     <section className="container mx-auto px-6 py-28">
  <div
    className={`grid grid-cols-1 md:grid-cols-2 gap-24 items-start ${
      isAr ? "md:flex-row-reverse" : ""
    }`}
  >
    {/* About the Academy */}
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-[#397a34]">
        {isAr ? "عن الأكاديمية" : "About the Academy"}
      </h2>

      <p className="text-gray-700 text-base leading-relaxed">
        {isAr
          ? "تأسست أكاديميتنا لتقديم تعليم عالي الجودة لجميع المتعلمين، مع محتوى حديث يلبي احتياجات السوق."
          : "Our academy was founded to provide high-quality education for all learners, with modern content that meets market needs."}
      </p>

      <p className="text-gray-700 text-base leading-relaxed">
        {isAr
          ? "نسعى لتمكين المتعلمين من اكتساب مهارات عملية تساعدهم على تطوير حياتهم المهنية والشخصية."
          : "We aim to empower learners with practical skills that help them grow professionally and personally."}
      </p>

      {/* نفس المستطيل القديم لكن بلون جديد */}
      <div className="h-64 rounded-2xl bg-[#6ab742]/20 border border-[#6ab742]/30" />
    </div>

    {/* Our Team */}
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-[#397a34]">
        {isAr ? "الفريق" : "Our Team"}
      </h2>

      <p className="text-gray-700 text-base leading-relaxed">
        {isAr
          ? "فريقنا يتكون من خبراء في التعليم والتقنيات الحديثة، ملتزمون بدعم المتعلمين في كل خطوة."
          : "Our team consists of experts in education and modern technologies, committed to supporting learners every step of the way."}
      </p>

      <p className="text-gray-700 text-base leading-relaxed">
        {isAr
          ? "نؤمن بأن نجاح المتعلمين هو نجاحنا، ونعمل دائمًا على تحسين التجربة التعليمية."
          : "We believe learner success is our success, and we continuously improve the learning experience."}
      </p>

      {/* نفس الدواير القديمة لكن بالأخضر */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="h-40 w-40 rounded-full bg-[#6ab742]/20 border border-[#6ab742]/30" />
        <div className="h-40 w-40 rounded-full bg-[#6ab742]/20 border border-[#6ab742]/30" />
      </div>
    </div>
  </div>
</section>


      {/* What We Offer */}
      <section className="bg-white py-28">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#397a34]">
            {isAr ? "ماذا نقدم" : "What We Offer"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: isAr ? "كورسات احترافية" : "Professional Courses",
                desc: isAr
                  ? "محتوى تعليمي مقدم من خبراء."
                  : "Educational content delivered by experts.",
              },
              {
                title: isAr ? "تعلم مرن" : "Flexible Learning",
                desc: isAr
                  ? "تعلم بالوتيرة التي تناسبك."
                  : "Learn at your own pace.",
              },
              {
                title: isAr ? "دعم مستمر" : "Continuous Support",
                desc: isAr
                  ? "نحن معك في كل خطوة."
                  : "We support you every step of the way.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-green-50 p-8 text-center shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold mb-3 text-lg text-[#397a34]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   
    </div>
  )
}
