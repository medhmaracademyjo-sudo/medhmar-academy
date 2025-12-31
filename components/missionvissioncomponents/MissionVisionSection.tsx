import {  FiTarget } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";

export default function MissionVisionSection({ isAr }: { isAr: boolean }) {
  const sections = [
    {
      title: isAr ? "الرؤية" : "Vision",
      desc: isAr
        ? "تمكين الأفراد من بناء مستقبل مهني وحياتي مستدام، وتعزيز ثقافة العمل المنتج والابتكار، بما يسهم في تحسين جودة الحياة ودعم التنمية المجتمعية الشاملة"
        : "Empowering individuals to build a sustainable professional and life future, promoting a culture of productive work and innovation, contributing to quality of life and comprehensive community development",
      icon: FaRegEye,
    },
    {
      title: isAr ? "الرسالة" : "Mission",
      desc: isAr
        ? "تأهيل المشاركين عبر برامج تدريبية متكاملة تركز على المهارات المهنية والحياتية، وتنمية القدرات الشخصية والسلوكية، وربط التدريب باحتياجات سوق العمل وتعزيز الاعتماد على الذات والانخراط الإيجابي في المجتمع"
        : "Preparing participants through integrated training programs focusing on professional and life skills, developing personal and behavioral capabilities, linking training to labor market needs and promoting self-reliance and positive community engagement",
      icon: FiTarget,
    },
  ];

  const iconBgColor = "#FDE68A30";

  return (
    <section className="py-28 bg-[#6ab742]/10">
      <h2 className="text-3xl centert md:text-4xl font-extrabold text-center mb-16 text-[#397a34]">
        {isAr ? "رسالتنا ورؤيتنا" : "Our Mission & Vision"}
      </h2>

      <div className="flex flex-wrap justify-center gap-10 px-4">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <div
              key={i}
              className="flex-1 min-w-[280px] max-w-md p-8 rounded-3xl shadow-lg flex flex-col items-center text-center gap-4 transform transition hover:-translate-y-2 hover:scale-105 bg-white"
            >
              <div
                className="p-5 rounded-full mb-5"
                style={{ backgroundColor: iconBgColor }}
              >
                <Icon size={44} className="text-[#397a34]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#397a34] mb-2">
                {section.title}
              </h3>
              <p className="text-gray-700">{section.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
