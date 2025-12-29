import HeroSection from "@/components/missionvissioncomponents/HeroSection"
import ValuesSection from "@/components/missionvissioncomponents/ValuesSection"
import ObjectivesSection from "@/components/missionvissioncomponents/ObjectivesSection"
import CTASection from "@/components/missionvissioncomponents/CTASection"
type Locale = "en" | "ar"

interface PageProps {
  params: {
    locale: Locale
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } =  await params
  const isAr = locale === 'ar'

  return (
    <div
      className="min-h-screen bg-green-50 text-gray-900"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Hero */}
      <HeroSection isAr={isAr} />

      {/* Values */}
      <ValuesSection isAr={isAr} />

      {/* Objectives */}
   ,<ObjectivesSection isAr={isAr}/>
      {/* Call To Action */}
      <CTASection isAr={isAr} />


    </div>
  )
}
