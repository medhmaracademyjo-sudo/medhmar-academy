import { FaBullseye, FaLightbulb } from "react-icons/fa"

export default function MissionVisionSection({ isAr }: { isAr: boolean }) {
  const sections = [
    {
      title: isAr ? "الرؤية" : "Vision",
      desc: isAr
        ? "تمكين الأفراد من بناء مستقبل مهني وحياتي مستدام، وتعزيز ثقافة العمل المنتج والابتكار، بما يسهم في تحسين جودة الحياة ودعم التنمية المجتمعية الشاملة"
        : "Empowering individuals to build a sustainable professional and life future, promoting a culture of productive work and innovation, contributing to quality of life and comprehensive community development",
      icon: <FaBullseye size={36} className="text-[#397a34]" />,
    },
    {
      title: isAr ? "الرسالة" : "Mission",
      desc: isAr
        ? "تأهيل المشاركين عبر برامج تدريبية متكاملة تركز على المهارات المهنية والحياتية، وتنمية القدرات الشخصية والسلوكية، وربط التدريب باحتياجات سوق العمل وتعزيز الاعتماد على الذات والانخراط الإيجابي في المجتمع"
        : "Preparing participants through integrated training programs focusing on professional and life skills, developing personal and behavioral capabilities, linking training to labor market needs and promoting self-reliance and positive community engagement",
      icon: <FaLightbulb size={36} className="text-[#397a34]" />,
    },
  ]

  return (
    <section className="py-28 bg-[#6ab742]/10">
      <h2 className="text-3xl font-bold centert mb-12 text-[#397a34]">
        {isAr ? "رسالتنا ورؤيتنا" : "Our Mission & Vision"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
        {sections.map((section, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition max-w-md flex flex-col items-center text-center gap-4"
          >
            {section.icon}
            <h3 className="text-xl font-bold text-[#397a34]">{section.title}</h3>
            <p className="text-gray-700">{section.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
