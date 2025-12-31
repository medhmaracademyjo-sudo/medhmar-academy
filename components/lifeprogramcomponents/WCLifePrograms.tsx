const reasons = [
  {
    titleAr: "تطوير شخصي",
    titleEn: "Personal Growth",
    descAr: "اكتساب مهارات حياتية مهمة.",
    descEn: "Acquire essential life skills.",
  },
  {
    titleAr: "صحة وعافية",
    titleEn: "Health & Wellness",
    descAr: "تعلم عادات صحية ونمط حياة متوازن.",
    descEn: "Learn healthy habits and a balanced lifestyle.",
  },
  {
    titleAr: "إدارة الوقت",
    titleEn: "Time Management",
    descAr: "تحكم بوقتك وحقق أهدافك.",
    descEn: "Control your time and achieve your goals.",
  },
]

export default function WhyChooseLifePrograms({ isAr }: { isAr: boolean }) {
  return (
    <section className="bg-[#6ab742]/10 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl centert md:text-4xl font-extrabold text-center mb-14 text-[#397a34]">
          {isAr ? "لماذا تختار برامج الحياة" : "Why Choose Life Programs"}
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
