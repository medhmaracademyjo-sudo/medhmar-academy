import AboutHero from "@/components/aboutcomponents/AboutHero"
import ManagementTeam from "@/components/aboutcomponents/ManagementTeam"
import ParticipantBenefits from "@/components/aboutcomponents/ParticipantBenefits"
import InitiativePartners from "@/components/aboutcomponents/InitiativePartners"
import AboutInitiative from "@/components/aboutcomponents/AboutInitiative"
import TechnicalTeam from "@/components/aboutcomponents/TechnicalTeam"




type Locale = "en" | "ar"

export default async function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = await params
  const isAr = locale === "ar"

  return (
    <div className="min-h-screen  bg-white">
      <AboutHero isAr={isAr} />
      <AboutInitiative isAr={isAr}/>
            <ParticipantBenefits isAr={isAr} />

      <InitiativePartners isAr={isAr}/>
      <ManagementTeam isAr={isAr} />
                  <TechnicalTeam isAr={isAr} />

    </div>
  )
}
