export default function ValuesSection({ isAr }: { isAr: boolean }) {
  const values = [
    {
      title: isAr ? "الجودة" : "Quality",
      desc: isAr ? "نلتزم بتقديم محتوى تعليمي عالي المستوى." : "We deliver high-quality educational content.",
    },
    {
      title: isAr ? "الابتكار" : "Innovation",
      desc: isAr ? "نستخدم أحدث الأساليب والتقنيات." : "We use modern learning approaches.",
    },
    {
      title: isAr ? "التمكين" : "Empowerment",
      desc: isAr ? "نساعد المتعلمين على تحقيق طموحاتهم." : "We help learners achieve their goals.",
    },
  ]

  return (
    <section className="py-28 bg-[#6ab742]/10">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#397a34]">
        {isAr ? "قيمنا" : "Our Values"}
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {values.map((v, i) => (
          <div key={i} className="bg-white p-10 w-64 text-center rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-3 text-[#397a34]">{v.title}</h3>
            <p className="text-gray-700">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
