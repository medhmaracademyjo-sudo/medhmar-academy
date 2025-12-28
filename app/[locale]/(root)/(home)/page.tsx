import Banner from '@/components/banner'
import StatsSection from '@/components/homecomponents/StatsSection'
import ProgramsSection from '@/components/homecomponents/ProgramsSection'
import CoursesSection from '@/components/homecomponents/CoursesSection'
import LearningSection from '@/components/homecomponents/LearningSection'
import BenefitsSection from '@/components/homecomponents/BenefitsSection'
import CTASection from '@/components/homecomponents/CTASection'
import Footer from '@/components/ui/Footer'
import { homeData } from '@/data/homedata'

type Locale = 'en' | 'ar'

interface PageProps {
  params: {
    locale: Locale
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } =  await params
  const isAr = locale === 'ar'

  return (
    <div className="min-h-screen bg-white text-black">
      <Banner isAr={isAr} images={homeData.images} />

      <StatsSection stats={homeData.stats} />
      <ProgramsSection programs={homeData.programs} />
      <CoursesSection courses={homeData.courses} />
      <LearningSection />
      <BenefitsSection benefits={homeData.benefits} />
      <CTASection />
      
    </div>
  )
}
