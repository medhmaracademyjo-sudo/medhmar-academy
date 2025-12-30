type Locale = 'en' | 'ar'

interface ClosingSectionProps {
  locale: Locale
}

export default function ClosingSection({ locale }: ClosingSectionProps) {
  const content = {
    en: {
      title: "Closing Statement",
      paragraphs: [
        "The Itqan Initiative is not merely a training program; it is a national development project that invests in people and believes that skill-building is the true path to nation-building.",
        "All content is carefully prepared after obtaining approvals and signing official agreements with participating entities, serving as a concise guide for what can be presented on the platform.",
        "A national development program that invests in intellectual capital. And God grants success."
      ]
    },
    ar: {
      title: "الختام",
      paragraphs: [
        "مبادرة إتقان ليست مجرد برنامج تدريبي؛ بل هي مشروع وطني يركز على الاستثمار في الإنسان ويؤمن أن بناء المهارات هو الطريق الحقيقي لبناء الأمة.",
        "يتم إعداد جميع المحتويات بعناية بعد الحصول على الموافقات وتوقيع الاتفاقيات الرسمية مع الجهات المشاركة، لتكون دليلًا مختصرًا لما يمكن عرضه على المنصة.",
        "برنامج وطني يركز على الاستثمار في رأس المال الفكري. وتوفيق الله حليفنا."
      ]
    }
  }

  const texts = content[locale]

  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-extrabold centert text-[#397a34] mb-8 animate-fadeIn">
          {texts.title}
        </h2>

        {texts.paragraphs.slice(0, 2).map((p, i) => (
          <p key={i} className="text-lg md:text-xl text-gray-700 mb-6">
            {locale === 'ar' ? <span dir="rtl">{p}</span> : p}
          </p>
        ))}

        <p className="text-lg md:text-xl text-green-900 font-semibold text-center border-t border-green-200 pt-6">
          {locale === 'ar' ? <span dir="rtl">{texts.paragraphs[2]}</span> : texts.paragraphs[2]}
        </p>
      </div>
    </section>
  )
}
