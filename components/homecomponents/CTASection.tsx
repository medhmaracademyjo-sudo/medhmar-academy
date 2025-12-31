import { Button } from '@/components/ui/button'
import Button1 from '../ui/Button1'
import Link from 'next/link'

type Locale = 'en' | 'ar'

interface CTASectionProps {
  locale: Locale
}

export default function CTASection({ locale }: CTASectionProps) {
  const content = {
    en: {
      title: "Start Learning Today",
      subtitle: "Join thousands of students and build skills that matter.",
      buttons: "Get Started"
    },
    ar: {
      title: "ابدأ التعلم اليوم",
      subtitle: "انضم إلى آلاف الطلاب وطور مهاراتك التي تُحدث فرقًا.",
      buttons:"ابدأ الآن"
    }
  }

  const texts = content[locale]

  return (
    <section className="bg-[#397a34] text-white">
      <div className="container mx-auto px-6 py-24 centert">
        <h2 className="text-3xl md:text-4xl  centert  font-extrabold mb-4">
          {texts.title}
        </h2>
        <p className="max-w-xl mx-auto mb-8  centert opacity-90 text-gray-100">
          {locale === 'ar' ? <span dir="rtl">{texts.subtitle}</span> : texts.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={"/programs/form"}>
          <Button1>
            {locale === 'ar' ? <span dir="rtl">{texts.buttons}</span> : texts.buttons}
          </Button1>
          </Link>
      
        </div>
      </div>
    </section>
  )
}
