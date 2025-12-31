import { Button } from '@/components/ui/button'
import { getProgramBySlugAndLocale } from '@/app/server/programs/services'
import { Locale, translatedProgram } from '@/types'
import { CalendarIcon, ClockIcon, ClipboardIcon, FlagIcon } from '@heroicons/react/24/outline'
import Button1 from '@/components/ui/Button1'
import Button2 from '@/components/ui/Button2'
import Link from 'next/link'

type PageProps = {
  params: {
    locale: Locale
    slug: string
  }
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { locale, slug } = await params
  const isAr = locale === 'ar'

  const response = await getProgramBySlugAndLocale(slug, locale)
  const course: translatedProgram | null = response.data
  console.log(response)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        {isAr ? 'البرنامج غير موجود' : 'Program not found'}
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-8">
        {course.image && (
          <img
            src={course.image}
            alt={course.program_title}
            className="lg:w-1/3 rounded-2xl shadow-md object-cover h-64 w-full"
          />
        )}
        <div className="lg:w-2/3 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-800">{course.program_title}</h1>
          <p className="text-gray-600">{course.program_description}</p>
          <div className="flex gap-4 mt-4">
            <Button2>{isAr ? 'التسجيل الآن' : 'Enroll Now'}</Button2>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <InfoCard
            label={isAr ? 'عدد الساعات' : 'Hours'}
            value={course.duration_h || '-'}
            Icon={ClockIcon}
          />
          <InfoCard
            label={isAr ? 'نوع البرنامج' : 'Program Type'}
            value={isAr ? 'برنامج مهني' : 'Professional Program'}
            Icon={ClipboardIcon}
          />
          <InfoCard
            label={isAr ? 'عدد الأيام' : 'Number of Days'}
            value={course.duration_d || '-'}
            Icon={CalendarIcon}
          />
   
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center bg-[#2f6f34] text-white rounded-2xl shadow">
        <h3 className="text-3xl font-bold mb-2">{isAr ? 'هل أنت مستعد للبدء؟' : 'Ready to start?'}</h3>
        <p className="mb-6">{isAr ? 'انضم الآن وابدأ رحلتك التعليمية.' : 'Join now and start your learning journey.'}</p>
        <Link href={"/programs/form"}>
        <Button1>
          {isAr ? 'التسجيل' : 'Enroll Now'}
        </Button1>
        </Link>
      </section>
    </div>
  )
}

type InfoCardProps = {
  label: string
  value: string
  Icon: React.ComponentType<{ className?: string }>
}

function InfoCard({ label, value, Icon }: InfoCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center text-center gap-2">
      <Icon className="w-6 h-6 text-[#2f6f34]" />
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  )
}
