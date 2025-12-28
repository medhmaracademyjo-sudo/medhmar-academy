import whitelogo from "@/public/whitelogo.png"
import whitelogo2 from "@/public/whitelogo2.png"
import wing from "@/public/wing.png"
import Image from "next/image"


type Locale = 'en' | 'ar'

interface PageProps {
  params: {
    locale: Locale
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const isAr = locale === 'ar'

  const objectives = [
    {
      title: isAr ? 'الأهداف العامة' : 'General Objectives',
      items: [
        isAr ? 'تعزيز التعليم للجميع' : 'Enhance education for all',
        isAr ? 'تطوير المهارات الحديثة' : 'Develop modern skills',
      ],
    },
    {
      title: isAr ? 'الأهداف الحياتية' : 'Life Objectives',
      items: [
        isAr ? 'تنمية المهارات اليومية' : 'Develop daily life skills',
        isAr ? 'تحقيق التوازن الشخصي' : 'Achieve personal balance',
      ],
    },
    {
      title: isAr ? 'الأهداف المهنية' : 'Career Objectives',
      items: [
        isAr ? 'تحسين فرص العمل' : 'Improve job opportunities',
        isAr ? 'تطوير مسار مهني ناجح' : 'Build a successful career path',
      ],
    },
    {
      title: isAr ? 'الأهداف الاجتماعية والجتمعية' : 'Social & Community Objectives',
      items: [
        isAr ? 'المساهمة في المجتمع' : 'Contribute to community',
        isAr ? 'تعزيز العمل التطوعي' : 'Promote volunteering',
      ],
    },
    {
      title: isAr ? 'الأهداف المستدامة' : 'Sustainable Objectives',
      items: [
        isAr ? 'الحفاظ على البيئة' : 'Preserve the environment',
        isAr ? 'تعزيز الاستدامة' : 'Promote sustainability',
      ],
    }
  ]

  return (
    <div className="min-h-screen  bg-green-50 text-gray-900   "  dir={isAr ? 'rtl' : 'ltr'}>
<section className="relative py-32 bg-[#397a34] flex flex-col md:flex-row items-center justify-center text-center md:text-left text-white px-6 overflow-hidden">

  <div className="relative text-center z-10 max-w-3xl flex flex-col items-center md:pr-12">
    <h1 className="text-4xl md:text-5xl  font-extrabold mb-6">
      {isAr ? 'رسالتنا ورؤيتنا وقيمنا وأهدافنا' : 'Mission,Vision,Values & Objectives'}
    </h1>
    <p className="text-lg  md:text-xl opacity-90 leading-relaxed mb-8">
      {isAr
        ? 'نؤمن بأن التعليم والأهداف الواضحة هما مفتاح مستقبل أفضل.'
        : 'We believe education and clear objectives are the key to a better future.'}
    </p>
    <button className="bg-white  text-[#397a34] px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-100 transition">
      {isAr ? 'ابدأ الآن' : 'Get Started'}
    </button>
  </div>
  <div className="absolute top-1/2 right-1/2 transform  -translate-y-1/2 translate-x-1/2 z-0 opacity-20 w-40 h-40 md:w-[900px] md:h-[900px] pointer-events-none">
    <Image
      src={whitelogo2} 
      alt="Logo Pattern"
      className="object-contain"
      fill
    />
  </div>
</section>













      {/* Values */}
      <section className="py-28 bg-[#6ab742]/10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#397a34]">{isAr ? 'قيمنا' : 'Our Values'}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[ 
              { title: isAr ? 'الجودة' : 'Quality', desc: isAr ? 'نلتزم بتقديم محتوى تعليمي عالي المستوى.' : 'We are committed to delivering high-quality educational content.' },
              { title: isAr ? 'الابتكار' : 'Innovation', desc: isAr ? 'نستخدم أحدث الأساليب والتقنيات التعليمية.' : 'We use modern and innovative learning approaches.' },
              { title: isAr ? 'التمكين' : 'Empowerment', desc: isAr ? 'نساعد المتعلمين على تحقيق طموحاتهم المهنية.' : 'We help learners achieve their professional goals.' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-10 w-64 text-center shadow-md hover:shadow-xl transition">
                <h3 className="font-bold text-xl mb-3 text-[#397a34]">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      {objectives.map((obj, index) => (
        <section key={obj.title} className={`${index % 2 === 0 ? 'bg-green-50' : 'bg-white'} py-28`}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#397a34]">{obj.title}</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {obj.items.map((item, idx) => (
                <div key={idx} className="w-64 h-64 rounded-3xl bg-white flex flex-col items-center justify-center p-6 text-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
                  <div className="h-16 w-16 bg-[#397a34] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {idx + 1}
                  </div>
                  <p className="text-[#1F2937] font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#397a34] text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">{isAr ? 'كن جزءًا من رحلتنا' : 'Be Part of Our Journey'}</h2>
          <p className="max-w-xl mx-auto mb-8 opacity-90">{isAr ? 'ابدأ رحلتك التعليمية اليوم واصنع مستقبلك.' : 'Start your learning journey today and build your future.'}</p>
          <button className="bg-white text-[#397a34] px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-100 transition">
            {isAr ? 'سجل الآن' : 'Join Now'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#397a34] text-white py-12">
        <div className="container mx-auto px-6 text-center text-sm opacity-90">
          {isAr ? '© 2025 منصة الكورسات. جميع الحقوق محفوظة.' : '© 2025 Courses Platform. All rights reserved.'}
        </div>
      </footer>

    </div>
  )
}
