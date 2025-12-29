export default function WhatWeOffer({ isAr }: { isAr: boolean }) {
  const items = [
    {
      title: isAr ? "كورسات احترافية" : "Professional Courses",
      desc: isAr ? "محتوى تعليمي مقدم من خبراء." : "Educational content delivered by experts.",
    },
    {
      title: isAr ? "تعلم مرن" : "Flexible Learning",
      desc: isAr ? "تعلم بالوتيرة التي تناسبك." : "Learn at your own pace.",
    },
    {
      title: isAr ? "دعم مستمر" : "Continuous Support",
      desc: isAr ? "نحن معك في كل خطوة." : "We support you every step of the way.",
    },
  ]

  return (
    <section className="bg-white py-28">
      <h2 className="text-3xl font-bold text-center mb-16 text-[#397a34]">
        {isAr ? "ماذا نقدم" : "What We Offer"}
      </h2>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
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
    </section>
  )
}
