import TeamMemberCard from "./TeamMemberCard"

export default function ManagementTeam({ isAr }: { isAr: boolean }) {
  const locale = isAr ? "ar" : "en"

  const team = [
    {
      name: "الدكتور أسامة الصمادي",
      role: "المدير العام للمبادرة",
      description: "نبذة مختصرييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييييبيبيبيبيبيبيبييييييييييييية عن العضو.",
    },
    {
      name: "الدكتور فيصل الغريب",
      role: "المستشار العام للمبادرة",
      description: "نبذة مختصرة عن العضو.",
    },
    {
      name: "الدكتور عبد المجيد الروابدة",
      role: "المدير التنفيذي",
      description: "نبذة مختصرة عن العضو.",
    },
  ]

  return (
    <section className="container mx-auto px-6 py-28">
      <h2 className="text-3xl font-bold centert text-[#397a34] mb-16">
        {isAr ? "الفريق الإداري" : "Management Team"}
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member, i) => (
          <div key={i} className="flex-1 min-w-[320px] max-w-xs">
            <TeamMemberCard {...member} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  )
}
