import TeamMemberCard from "./TeamMemberCard"
import {getMembersByTypeAndLocale} from "@/app/server/our_team/services"
export default async function ManagementTeam({ isAr }: { isAr: boolean }) {
  const locale = isAr ? "ar" : "en"
const managementMembers=  (await getMembersByTypeAndLocale(locale,"founder")).data
  

  return (
    <section className="container mx-auto px-6 py-28">
      <h2 className="text-3xl font-bold centert text-[#397a34] mb-16">
        {isAr ? "الفريق الإداري" : "Management Team"}
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {managementMembers.map((member, i) => (
          <div key={i} className="flex-1 min-w-[320px] max-w-xs">
            <TeamMemberCard data={member} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  )
}
