import TechnicalTeamMemberCard from "./TechnicalTeamMemberCard"
import {getMembersByTypeAndLocale} from "@/app/server/our_team/services"

export default async function TechnicalTeam({ isAr }: { isAr: boolean }) {
    const locale = isAr ? "ar" : "en"
  const lifeProgramsMembers=  (await getMembersByTypeAndLocale(locale,"life_programs")).data
    const professionalProgramsMembers=  (await getMembersByTypeAndLocale(locale,"professional_programs")).data

const team= [...lifeProgramsMembers,...professionalProgramsMembers]
  
 

  return (
    <section className="bg-green-50">  
    <section className="container mx-auto px-6 py-28">
      <h2 className="text-3xl font-bold centert text-[#397a34] mb-16">
        {isAr ? "الفريق الفني" : "Technical Team"}
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member, i) => (
          <div key={i} className="flex-1 min-w-[320px] max-w-xs">
            <TechnicalTeamMemberCard data={member} locale={locale} />
          </div>
        ))}
      </div>
    </section>
    </section>
  )
}
