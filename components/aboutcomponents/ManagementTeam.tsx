import TeamMemberCard from "./TeamMemberCard"

export default function ManagementTeam({ isAr }: { isAr: boolean }) {
  const team = [
    { name: "الدكتور أسامة الصمادي", role: "المدير العام للمبادرة" },
    { name: "الدكتور فيصل الغريب", role: "المستشار العام للمبادرة" },
    { name: "الدكتور عبد المجيد الروابدة", role: "المدير التنفيذي" },
    { name: "الدكتور يحيى القبالي", role: "منسق عام المبادرة" },
    { name: "الأستاذ غسان زعتر", role: "مسؤول العلاقات العامة" },
    { name: "الدكتور جمال هياجنة", role: "منسق البرامج المهنية" },
    { name: "مالك الصمادي", role: "منسق البرامج الحياتية وقاعات التدريب" },
    { name: "ماريا عبد الرزاق", role: "مسؤولة التسويق" },
    { name: "فؤاد إسماعيل", role: "مسؤول الضيافة" },
  ]

  return (
    <section className="container mx-auto px-6 py-28">
      <h2 className="text-3xl font-bold centert text-center text-[#397a34] mb-16">
        {isAr ? "الفريق الإداري" : "Management Team"}
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member, i) => (
          <div key={i} className="flex-1 min-w-[320px] max-w-xs">
            <TeamMemberCard {...member} />
          </div>
        ))}
      </div>
    </section>
  )
}
