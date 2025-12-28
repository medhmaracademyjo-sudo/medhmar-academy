import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type Locale = 'en' | 'ar'

interface PageProps {
  params: {
    locale: Locale
  }
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { locale } = await params
  const isAr = locale === 'ar'

  const course = {
    title: isAr ? 'مقدمة في React' : 'Introduction to React',
    description: isAr
      ? 'تعلم أساسيات React لبناء واجهات تفاعلية وحديثة بسرعة وسهولة.'
      : 'Learn the fundamentals of React to build modern, interactive UIs quickly and efficiently.',
    image: 'https://picsum.photos/1200/500?random=201',
    syllabus: [
      { title: isAr ? 'مقدمة في React' : 'React Basics', duration: '20 min' },
      { title: isAr ? 'المكونات والProps' : 'Components & Props', duration: '35 min' },
      { title: isAr ? 'الحالة State' : 'State Management', duration: '40 min' },
      { title: isAr ? 'التعامل مع الأحداث' : 'Event Handling', duration: '30 min' },
      { title: isAr ? 'استخدام Hooks' : 'Using Hooks', duration: '45 min' },
    ],
    instructor: {
      name: isAr ? 'أحمد علي' : 'Ahmed Ali',
      bio: isAr
        ? 'مدرب متمرس في تطوير الواجهات الأمامية باستخدام React.'
        : 'Experienced instructor in front-end development with React.',
      image: 'https://picsum.photos/200/200?random=202',
    },
    duration: '5h 30min',
    level: isAr ? 'مبتدئ إلى متوسط' : 'Beginner to Intermediate',
  }

  return (
    <div className="min-h-screen bg-green-50 text-gray-900" dir={isAr ? 'rtl' : 'ltr'}>

      {/* Banner */}
      <section className="relative py-32 bg-[#397a34] flex flex-col md:flex-row items-center justify-center text-center md:text-left text-white px-6 overflow-hidden">
        <div className="relative text-center z-10 max-w-3xl flex flex-col items-center md:pr-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{course.title}</h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-8">{course.description}</p>
          <Button className="bg-white text-[#397a34] px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-100 transition">
            {isAr ? 'ابدأ الآن' : 'Get Started'}
          </Button>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-28 bg-green-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#397a34]">{isAr ? 'محتوى الكورس' : 'Course Syllabus'}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {course.syllabus.map((lesson, idx) => (
              <div key={idx} className="w-64 h-64 rounded-3xl bg-white flex flex-col items-center justify-center p-6 text-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="h-16 w-16 bg-[#397a34] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {idx + 1}
                </div>
                <p className="text-[#1F2937] font-medium">{lesson.title}</p>
                <p className="text-gray-600 mt-2">{lesson.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#397a34]">{isAr ? 'المدرب' : 'Instructor'}</h2>
          <div className="inline-flex flex-col items-center">
            <img
              src={course.instructor.image}
              alt={course.instructor.name}
              className="w-40 h-40 rounded-full border-4 border-[#397a34] mb-6"
            />
            <h3 className="text-2xl font-bold mb-2 text-[#397a34]">{course.instructor.name}</h3>
            <p className="text-gray-700 max-w-xl">{course.instructor.bio}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#397a34] text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">{isAr ? 'ابدأ رحلتك التعليمية الآن' : 'Start Your Learning Journey Today'}</h2>
          <Button className="bg-white text-[#397a34] px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-100 transition mt-6">
            {isAr ? 'الالتحاق بالكورس' : 'Enroll Now'}
          </Button>
        </div>
      </section>

     
    </div>
  )
}
