import MissionVisionSection from "@/components/missionvissioncomponents/MissionVisionSection"
import ObjectivesSection from "@/components/missionvissioncomponents/ObjectivesSection"
import CTASection from "@/components/missionvissioncomponents/CTASection"
import HeroSection from "@/components/missionvissioncomponents/HeroSection"

type Locale = "en" | "ar"

interface PageProps {
  params: {
    locale: Locale
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const isAr = locale === "ar"

  return (
    <div className="min-h-screen bg-green-50 text-gray-900" dir={isAr ? "rtl" : "ltr"}>
            <HeroSection isAr={isAr} />

      <MissionVisionSection isAr={isAr} />
      <ObjectivesSection isAr={isAr} />
      <CTASection isAr={isAr} />
    </div>
  )
}
