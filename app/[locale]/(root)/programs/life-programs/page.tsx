import LifeHero from "@/components/lifeprogramcomponents/LifeHero"
import LifeProgramsGrid from "@/components/lifeprogramcomponents/LifeProgramsGrid"
import WhyChooseLifePrograms from "@/components/lifeprogramcomponents/WCLifePrograms"
import LifeCTA from "@/components/lifeprogramcomponents/LifeCTA"
import {getProgramsByLocale} from "@/app/server/programs/services"


type Locale = "en" | "ar"

export default async function Page({ params }: { params: { locale: Locale } }) {
  const { locale } =  await params
  const isAr = locale === 'ar'
    const data=await getProgramsByLocale(locale,"life_programs")
  const programs = data?.data ?? []
  

  return (
    <div
      className="w-full min-h-screen bg-green-50 text-gray-900"
      dir={isAr ? "rtl" : "ltr"}
    >
      <LifeHero isAr={isAr} />
      <LifeProgramsGrid programs={programs}  />
      <WhyChooseLifePrograms isAr={isAr} />
      <LifeCTA isAr={isAr} />
    </div>
  )
}
