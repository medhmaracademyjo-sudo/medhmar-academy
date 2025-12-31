import Banner from '@/components/banner'
import StatsSection from '@/components/homecomponents/StatsSection'
import ProgramsSection from '@/components/homecomponents/ProgramsSection'
import CoursesSection from '@/components/homecomponents/CoursesSection'
import LearningSection from '@/components/homecomponents/LearningSection'
import ClosingSection from '@/components/homecomponents/ClosingSection'
import CTASection from '@/components/homecomponents/CTASection'
import Footer from '@/components/ui/Footer'
import { homeData } from '@/data/homedata'
import {getAllBannersByLocale} from "@/app/server/banners/services"
import {getFeaturedProgramsByLocale} from "@/app/server/programs/services"

import { getSettingByFieldName } from "@/app/server/settings/services";



type Locale = 'en' | 'ar'

interface PageProps {
  params: {
    locale: Locale
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } =  await params
  const data=await getAllBannersByLocale(locale)()
    const number_of_programs = await getSettingByFieldName(
    
    "number_of_programs"
  );
  const number_of_students = await getSettingByFieldName(
    
    "number_of_students"
  );
  const number_of_instructors = await getSettingByFieldName(
    
    "number_of_instructors"
  );
    const programs=await getFeaturedProgramsByLocale(locale)

  const banners=data?.data
  
  

  return (
    <div className="min-h-screen bg-white text-black">
      <Banner locale={locale} banners={banners ?? []} />

         <StatsSection
        stats={{
          number_of_programs: number_of_programs?.value,
          number_of_students: number_of_students?.value,
          number_of_instructors: number_of_instructors?.value,
           locale:locale
        }}
       
      />
      <ProgramsSection locale={locale} />
      <CoursesSection courses={programs.data} locale={locale} />
      <LearningSection  locale={locale} />
      <ClosingSection  locale={locale} />
      <CTASection locale={locale} />
      
    </div>
  )
}
