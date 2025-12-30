export default function LifeObjectives({ isAr }: { isAr: boolean }) {
  const items = isAr
    ? [
        "تطوير مهارات التواصل والعمل الجماعي",
        "تعزيز مهارات إدارة الوقت وتحديد الأولويات",
        "بناء الثقة بالنفس والدافعية للإنجاز",
        "تنمية مهارات حل المشكلات واتخاذ القرار",
        "ترسيخ القيم الإيجابية والمسؤولية",
      ]
    : [
        "Develop communication and teamwork skills",
        "Enhance time management and prioritization skills",
        "Build self-confidence and motivation for achievement",
        "Develop problem-solving and decision-making skills",
        "Instill positive values and responsibility",
      ]

  return (
    <section className="bg-green-50 py-28">
      <h2 className="text-3xl font-bold centert mb-12 text-[#397a34]">
        {isAr ? "الأهداف الحياتية" : "Life Objectives"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition max-w-xs flex flex-col items-center text-center"
          >
            <p className="font-medium text-gray-800">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
