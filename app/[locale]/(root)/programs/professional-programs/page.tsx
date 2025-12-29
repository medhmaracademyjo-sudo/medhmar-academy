import ProfessionalHero from "@/components/professionalprogramscomponent/ProfessionalHero"
import ProfessionalProgramsGrid from "@/components/professionalprogramscomponent/ProfessionalProgramsGrid"
import WhyChooseProfessionalPrograms from "@/components/professionalprogramscomponent/WhyChooseProfessionalPrograms"
import ProfessionalCTA from "@/components/professionalprogramscomponent/ProfessionalCTA"
import {getProgramsByLocale} from "@/app/server/programs/services"

type Locale = "en" | "ar"

export default async function Page({ params }: { params: { locale: Locale } }) {
  const { locale } =  await params
  const isAr = locale === 'ar'
  const data=await getProgramsByLocale(locale,"professional_programs")
const programs = data?.data ?? []


  return (
    <div
      className="w-full min-h-screen bg-green-50 text-gray-900"
      dir={isAr ? "rtl" : "ltr"}
    >
      <ProfessionalHero isAr={isAr} />
      <ProfessionalProgramsGrid programs={programs} />
      <WhyChooseProfessionalPrograms isAr={isAr} />
      <ProfessionalCTA isAr={isAr} />
    </div>
  )
}
