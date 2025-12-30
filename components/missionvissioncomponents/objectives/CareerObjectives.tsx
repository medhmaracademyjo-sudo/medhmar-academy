export default function CareerObjectives({ isAr }: { isAr: boolean }) {
  const items = isAr
    ? [
        "تزويد المشاركين بالمهارات التقنية المطلوبة لمهن محددة",
        "ربط التدريب باحتياجات سوق العمل",
        "تنمية مهارات السلامة المهنية والانضباط",
        "تأهيل المشاركين لمهارات البحث عن عمل وريادة الأعمال",
      ]
    : [
        "Provide participants with technical skills for specific jobs",
        "Link training to labor market needs",
        "Develop occupational safety and discipline skills",
        "Prepare participants for job searching and entrepreneurship",
      ]

  return (
    <section className="bg-white py-28">
      <h2 className="text-3xl font-bold centert mb-12 text-[#397a34]">
        {isAr ? "الأهداف المهنية" : "Career Objectives"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-green-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition max-w-xs flex flex-col items-center text-center"
          >
            <p className="font-medium text-gray-800">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
