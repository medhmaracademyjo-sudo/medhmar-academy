const reasons = [
  {
    titleEn: "Practical Skills",
    titleAr: "مهارات عملية",
    descEn: "Learn skills you can apply immediately.",
    descAr: "تعلم مهارات قابلة للتطبيق مباشرة.",
  },
  {
    titleEn: "Industry Experts",
    titleAr: "خبراء في المجال",
    descEn: "Courses delivered by industry experts.",
    descAr: "الدروس مقدمة من خبراء محترفين.",
  },
  {
    titleEn: "Career Opportunities",
    titleAr: "فرص وظيفية",
    descEn: "Programs designed to boost your career.",
    descAr: "برامج تساعدك على التقدم في حياتك المهنية.",
  },
]

export default function WhyChooseProfessionalPrograms({
  isAr,
}: {
  isAr: boolean
}) {
  return (
    <section className="bg-[#6ab742]/10 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl centert md:text-4xl font-extrabold text-center mb-14 text-[#397a34]">
          {isAr
            ? "لماذا تختار البرامج الاحترافية"
            : "Why Choose Professional Programs"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {reasons.map(item => (
            <div
              key={isAr ? item.titleAr : item.titleEn}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition border border-black/10"
            >
              <h3 className="font-bold text-xl mb-3 text-[#397a34]">
                {isAr ? item.titleAr : item.titleEn}
              </h3>
              <p className="text-gray-700">
                {isAr ? item.descAr : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
