// TechnicalTeam.tsx
import TechnicalTeamMemberCard from "./TechnicalTeamMemberCard"

export default function TechnicalTeam({ isAr }: { isAr: boolean }) {
  const team = [
    { name: "سامر الحسن", role: "مهندس برمجيات أول" },
    { name: "ليلى الجابر", role: "مصممة تجربة المستخدم" },
    { name: "عمر الكردي", role: "مهندس DevOps" },
    { name: "هالة فهد", role: "محللة بيانات" },
    { name: "رامي نعيم", role: "مهندس واجهات أمامية" },
    { name: "مريم شريف", role: "مهندسة واجهات خلفية" },
    { name: "تامر أبو راشد", role: "مختبر جودة البرمجيات" },
    { name: "نورا سعيد", role: "مسؤولة دعم فني" },
    { name: "خالد يوسف", role: "منسق البنية التحتية" },
  ]

  return (
    <section className="bg-green-50">  
    <section className="container mx-auto px-6 py-28">
      <h2 className="text-3xl font-bold centert text-[#397a34] mb-16">
        {isAr ? "الفريق الفني" : "Technical Team"}
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member, i) => (
          <div key={i} className="flex-1 min-w-[320px] max-w-xs">
            <TechnicalTeamMemberCard {...member} />
          </div>
        ))}
      </div>
    </section>
    </section>
  )
}
