type Locale = 'en' | 'ar'

interface PageProps {
  params: {
    locale: Locale
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const isAr = locale === 'ar'

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <section className="bg-black text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {isAr ? 'البرامج التعليمية' : 'Our Programs'}
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            {isAr
              ? 'اختر البرنامج الذي يناسب أهدافك التعليمية.'
              : 'Choose the program that fits your learning goals.'}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-lg border border-black bg-white p-6 space-y-4">
            <div className="h-40 bg-gray-300 rounded-md" />
            <h2 className="text-xl font-semibold">
              {isAr ? 'تطوير الويب' : 'Web Development'}
            </h2>
            <p className="text-sm text-gray-600">
              {isAr
                ? 'تعلم بناء مواقع وتطبيقات حديثة من الصفر.'
                : 'Learn to build modern websites and applications from scratch.'}
            </p>
            <button className="w-full rounded-md bg-black text-white py-2 text-sm font-medium hover:bg-gray-800">
              {isAr ? 'عرض البرنامج' : 'View Program'}
            </button>
          </div>

          <div className="rounded-lg border border-black bg-white p-6 space-y-4">
            <div className="h-40 bg-gray-300 rounded-md" />
            <h2 className="text-xl font-semibold">
              {isAr ? 'تصميم واجهات المستخدم' : 'UI/UX Design'}
            </h2>
            <p className="text-sm text-gray-600">
              {isAr
                ? 'صمم تجارب مستخدم جذابة واحترافية.'
                : 'Design engaging and professional user experiences.'}
            </p>
            <button className="w-full rounded-md bg-black text-white py-2 text-sm font-medium hover:bg-gray-800">
              {isAr ? 'عرض البرنامج' : 'View Program'}
            </button>
          </div>

          <div className="rounded-lg border border-black bg-white p-6 space-y-4">
            <div className="h-40 bg-gray-300 rounded-md" />
            <h2 className="text-xl font-semibold">
              {isAr ? 'التسويق الرقمي' : 'Digital Marketing'}
            </h2>
            <p className="text-sm text-gray-600">
              {isAr
                ? 'طور مهاراتك في التسويق عبر الإنترنت.'
                : 'Develop your online marketing skills.'}
            </p>
            <button className="w-full rounded-md bg-black text-white py-2 text-sm font-medium hover:bg-gray-800">
              {isAr ? 'عرض البرنامج' : 'View Program'}
            </button>
          </div>

        </div>
      </section>

      <footer className="bg-black text-white">
        <div className="container mx-auto px-6 py-8 text-center text-sm opacity-90">
          {isAr
            ? '© 2025 منصة الكورسات. جميع الحقوق محفوظة.'
            : '© 2025 Courses Platform. All rights reserved.'}
        </div>
      </footer>
    </div>
  )
}
