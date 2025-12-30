export default function SocialObjectives({ isAr }: { isAr: boolean }) {
  const items = isAr
    ? ["المساهمة في المجتمع", "تعزيز العمل التطوعي"]
    : ["Contribute to the community", "Promote volunteering"]

  return (
    <section className="bg-white py-28">
      <h2 className="text-3xl font-bold centert mb-12 text-[#397a34]">
        {isAr ? "الأهداف الاجتماعية والمجتمعية" : "Social & Community Objectives"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
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
