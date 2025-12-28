import React from 'react'
import { Button } from '@/components/ui/button'

type Locale = 'en' | 'ar'

interface PageProps {
  params: {
    locale: Locale
  }
}

const professionalPrograms = [
  { titleEn: 'Web Development', titleAr: 'تطوير الويب', descEn: 'Learn modern web development techniques.', descAr: 'تعلم تقنيات تطوير الويب الحديثة.' },
  { titleEn: 'UI/UX Design', titleAr: 'تصميم واجهة وتجربة المستخدم', descEn: 'Design user-friendly interfaces.', descAr: 'صمم واجهات سهلة الاستخدام.' },
  { titleEn: 'Digital Marketing', titleAr: 'التسويق الرقمي', descEn: 'Master online marketing strategies.', descAr: 'إتقان استراتيجيات التسويق عبر الإنترنت.' }
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
            {isAr ? 'البرامج الاحترافية' : 'Professional Programs'}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed">
            {isAr
              ? 'طور مهاراتك الاحترافية مع برامج مصممة لتلبية احتياجات سوق العمل.'
              : 'Enhance your professional skills with programs tailored to industry needs.'}
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
      </section>

      {/* Programs */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {professionalPrograms.map(program => (
            <div
              key={isAr ? program.titleAr : program.titleEn}
              className="rounded-3xl bg-white p-8 text-center shadow-md hover:shadow-xl transition border border-black/10"
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
            {isAr ? 'لماذا تختار البرامج الاحترافية' : 'Why Choose Professional Programs'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { titleEn: 'Practical Skills', titleAr: 'مهارات عملية', descEn: 'Learn skills you can apply immediately.', descAr: 'تعلم مهارات قابلة للتطبيق مباشرة.' },
              { titleEn: 'Industry Experts', titleAr: 'خبراء في المجال', descEn: 'Courses delivered by industry experts.', descAr: 'الدروس مقدمة من خبراء محترفين.' },
              { titleEn: 'Career Opportunities', titleAr: 'فرص وظيفية', descEn: 'Programs designed to boost your career.', descAr: 'برامج تساعدك على التقدم في حياتك المهنية.' }
            ].map(item => (
              <div key={isAr ? item.titleAr : item.titleEn} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition border border-black/10">
                <h3 className="font-bold text-xl mb-3 text-[#397a34]">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-gray-700">{isAr ? item.descAr : item.descEn}</p>
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
            ? 'انضم إلى البرامج الاحترافية وارتق بمهاراتك المهنية الآن.'
            : 'Join our professional programs and advance your skills today.'}
        </p>
        <Button className="bg-[#397a34] text-white px-10 py-3 hover:bg-green-700">
          {isAr ? 'البدء الآن' : 'Start Now'}
        </Button>
      </section>

    </div>
  )
}
