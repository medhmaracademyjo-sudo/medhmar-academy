import AboutHero from "@/components/aboutcomponents/AboutHero"
import AboutAcademy from "@/components/aboutcomponents/AboutAcademy"
import AboutTeam from "@/components/aboutcomponents/AboutTeam"
import WhatWeOffer from "@/components/aboutcomponents/WhatWeOffer"

type Locale = "en" | "ar"

export default async function Page({ params }: { params: { locale: Locale } }) {
  const { locale } =  await params
  const isAr = locale === 'ar'

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-green-50">
      <AboutHero isAr={isAr} />

      <section className="container mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <AboutAcademy isAr={isAr} />
          <AboutTeam isAr={isAr} />
        </div>
      </section>

      <WhatWeOffer isAr={isAr} />
    </div>
  )
}
