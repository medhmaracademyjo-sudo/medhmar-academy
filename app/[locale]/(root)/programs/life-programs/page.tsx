import React from 'react'
import { Button } from '@/components/ui/button'

type Locale = 'en' | 'ar'

interface PageProps {
  params: {
    locale: Locale
  }
}

const lifePrograms = [
  {
    titleEn: 'Personal Development',
    titleAr: 'التطوير الشخصي',
    descEn: 'Improve your skills and mindset.',
    descAr: 'طور مهاراتك وعقليتك.'
  },
  {
    titleEn: 'Health & Wellness',
    titleAr: 'الصحة والعافية',
    descEn: 'Learn healthy habits and lifestyle.',
    descAr: 'تعلم عادات ونمط حياة صحي.'
  },
  {
    titleEn: 'Time Management',
    titleAr: 'إدارة الوقت',
    descEn: 'Master time management techniques.',
    descAr: 'إتقان تقنيات إدارة الوقت.'
  }
]

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const isAr = locale === 'ar'

  return (
    <div className="w-full min-h-screen bg-green-50 text-gray-900" dir={isAr ? 'rtl' : 'ltr'}>

      {/* Hero */}
      <section className="relative bg-[#397a34] text-white py-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            {isAr ? 'برامج الحياة' : 'Life Programs'}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed">
            {isAr
              ? 'طور حياتك ومهاراتك الشخصية مع برامج حياتية مبتكرة ومميزة.'
              : 'Enhance your life and personal skills with innovative and impactful life programs.'}
          </p>
        </div>

        {/* subtle decoration */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
      </section>

      {/* Programs */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lifePrograms.map(program => (
            <div
              key={isAr ? program.titleAr : program.titleEn}
              className="
                rounded-3xl
                bg-white
                p-8
                text-center
                shadow-md
                hover:shadow-xl
                transition
                border border-black/10
              "
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#397a34]">
                {isAr ? program.titleAr : program.titleEn}
              </h3>

              <p className="text-gray-700 mb-6">
                {isAr ? program.descAr : program.descEn}
              </p>

              <Button className="bg-[#397a34] text-white w-full hover:bg-green-700">
                {isAr ? 'عرض التفاصيل' : 'View Details'}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-[#6ab742]/10 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-[#397a34]">
            {isAr ? 'لماذا تختار برامج الحياة' : 'Why Choose Life Programs'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                titleAr: 'تطوير شخصي',
                titleEn: 'Personal Growth',
                descAr: 'اكتساب مهارات حياتية مهمة.',
                descEn: 'Acquire essential life skills.'
              },
              {
                titleAr: 'صحة وعافية',
                titleEn: 'Health & Wellness',
                descAr: 'تعلم عادات صحية ونمط حياة متوازن.',
                descEn: 'Learn healthy habits and a balanced lifestyle.'
              },
              {
                titleAr: 'إدارة الوقت',
                titleEn: 'Time Management',
                descAr: 'تحكم بوقتك وحقق أهدافك.',
                descEn: 'Control your time and achieve your goals.'
              }
            ].map(item => (
              <div
                key={isAr ? item.titleAr : item.titleEn}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition border border-black/10"
              >
                <h3 className="font-bold text-xl mb-3 text-[#397a34]">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-gray-700">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[#397a34]">
          {isAr ? 'ابدأ اليوم' : 'Get Started Today'}
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl mx-auto">
          {isAr
            ? 'انضم إلى برامج الحياة وابدأ تطوير مهاراتك الآن.'
            : 'Join our life programs and start improving your skills now.'}
        </p>
        <Button className="bg-[#397a34] text-white px-10 py-3 hover:bg-green-700">
          {isAr ? 'البدء الآن' : 'Start Now'}
        </Button>
      </section>

    </div>
  )
}
