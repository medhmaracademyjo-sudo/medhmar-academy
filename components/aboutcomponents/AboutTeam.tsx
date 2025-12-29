export default function AboutTeam({ isAr }: { isAr: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-[#397a34]">
        {isAr ? "الفريق" : "Our Team"}
      </h2>

      <p className="text-gray-700 leading-relaxed">
        {isAr
          ? "فريقنا يتكون من خبراء في التعليم والتقنيات الحديثة، ملتزمون بدعم المتعلمين في كل خطوة."
          : "Our team consists of experts in education and modern technologies, committed to supporting learners every step of the way."}
      </p>

      <p className="text-gray-700 leading-relaxed">
        {isAr
          ? "نؤمن بأن نجاح المتعلمين هو نجاحنا، ونعمل دائمًا على تحسين التجربة التعليمية."
          : "We believe learner success is our success, and we continuously improve the learning experience."}
      </p>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="h-40 w-40 rounded-full bg-[#6ab742]/20 border border-[#6ab742]/30" />
        <div className="h-40 w-40 rounded-full bg-[#6ab742]/20 border border-[#6ab742]/30" />
      </div>
    </div>
  )
}
