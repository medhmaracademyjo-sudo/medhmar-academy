import { FiUsers, FiHeart } from "react-icons/fi";

export default function SocialObjectives({ isAr }: { isAr: boolean }) {
  const items = isAr
    ? ["المساهمة في المجتمع", "تعزيز العمل التطوعي"]
    : ["Contribute to the community", "Promote volunteering"];

  const colors = ["#FFFFFF", "#D1FAE5"];
  const icons = [FiUsers, FiHeart];

  return (
    <section className="bg-white py-28">
      <h2 className="text-3xl md:text-4xl centert font-bold text-center mb-12 text-[#397a34]">
        {isAr ? "الأهداف الاجتماعية والمجتمعية" : "Social & Community Objectives"}
      </h2>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={i}
              className="flex-1 min-w-[220px] max-w-xs p-6 rounded-3xl shadow-lg flex flex-col items-center text-center transform transition hover:-translate-y-2 hover:scale-105"
              style={{ backgroundColor: colors[i] }}
            >
              <Icon className="text-4xl mb-4 text-[#397a34]" />
              <p className="font-medium text-gray-800">{item}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
