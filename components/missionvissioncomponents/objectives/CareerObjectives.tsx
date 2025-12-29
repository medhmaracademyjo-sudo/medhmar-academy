export default function CareerObjectives({ isAr }: { isAr: boolean }) {
  const items = [
    isAr ? "تحسين فرص العمل" : "Improve job opportunities",
    isAr ? "تطوير مسار مهني ناجح" : "Build a successful career path",
  ]

  return (
    <section className="bg-green-50 py-28">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#397a34]">
        {isAr ? "الأهداف المهنية" : "Career Objectives"}
      </h2>

      <div className="flex justify-center gap-8 flex-wrap">
        {items.map((item, i) => (
          <div key={i} className="w-64 h-64 bg-white rounded-3xl shadow-md flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-[#397a34] text-white rounded-full flex items-center justify-center mb-4">
              {i + 1}
            </div>
            <p className="font-medium text-gray-800">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
