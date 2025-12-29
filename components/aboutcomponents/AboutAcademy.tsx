export default function AboutAcademy({ isAr }: { isAr: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-[#397a34]">
        {isAr ? "عن الأكاديمية" : "About the Academy"}
      </h2>

      <p className="text-gray-700 leading-relaxed">
        {isAr
          ? "تأسست أكاديميتنا لتقديم تعليم عالي الجودة لجميع المتعلمين، مع محتوى حديث يلبي احتياجات السوق."
          : "Our academy was founded to provide high-quality education for all learners, with modern content that meets market needs."}
      </p>

      <p className="text-gray-700 leading-relaxed">
        {isAr
          ? "نسعى لتمكين المتعلمين من اكتساب مهارات عملية تساعدهم على تطوير حياتهم المهنية والشخصية."
          : "We aim to empower learners with practical skills that help them grow professionally and personally."}
      </p>

      <div className="h-64 rounded-2xl bg-[#6ab742]/20 border border-[#6ab742]/30" />
    </div>
  )
}
