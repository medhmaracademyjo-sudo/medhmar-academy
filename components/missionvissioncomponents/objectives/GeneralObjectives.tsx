export default function GeneralObjectives({ isAr }: { isAr: boolean }) {
  const items = isAr
    ? [
        "إكساب الشباب مهارات حقيقية قابلة للتطبيق",
        "تعزيز فرص التشغيل والعمل الحر",
        "بناء شخصية متوازنة قادرة على اتخاذ القرار",
        "دعم ثقافة العمل والإنتاج",
        "المساهمة في التنمية المجتمعية المستدامة",
      ]
    : [
        "Provide youth with practical skills",
        "Enhance employment and freelancing opportunities",
        "Build a balanced personality capable of decision-making",
        "Promote a culture of work and productivity",
        "Contribute to sustainable community development",
      ]

  return (
    <section className="bg-green-50 py-28">
      <h2 className="text-3xl font-bold centert mb-12 text-[#397a34]">
        {isAr ? "الأهداف العامة" : "General Objectives"}
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
