import AboutHero from "@/components/aboutcomponents/AboutHero"
import ManagementTeam from "@/components/aboutcomponents/ManagementTeam"
import ParticipantBenefits from "@/components/aboutcomponents/ParticipantBenefits"
import InitiativePartners from "@/components/aboutcomponents/InitiativePartners"
import AboutInitiative from "@/components/aboutcomponents/AboutInitiative"
import TechnicalTeam from "@/components/aboutcomponents/TechnicalTeam"
import {getNonFounderMembersCount} from "@/app/server/our_team/services"
import {getPartnersByLocale} from "@/app/server/partners/services"

type Locale = "en" | "ar"

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  
  const { locale } = await params
  const isAr = locale === "ar"
  const isTechnicalTeam=  (await getNonFounderMembersCount()).data>0
  const partners= (await getPartnersByLocale(locale)).data
  return (
    <div className="min-h-screen  bg-white">
      <AboutHero isAr={isAr} />
      <AboutInitiative isAr={isAr}/>
            <ParticipantBenefits isAr={isAr} />

      <InitiativePartners isAr={isAr} partners={partners}/>
      <ManagementTeam isAr={isAr} />
                  {isTechnicalTeam&&<TechnicalTeam isAr={isAr} />}

    </div>
  )
}
