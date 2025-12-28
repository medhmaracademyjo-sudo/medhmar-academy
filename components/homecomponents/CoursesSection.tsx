import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Course from "@/public/course.jpeg"
import Image from 'next/image'

export default function CoursesSection({ courses }: { courses: string[] }) {
  return (
    <section className="bg-green-50">
      <div className="container mx-auto px-6 py-28">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 text-[#397a34]">
          Featured Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map(title => (
            <Card
              key={title}
              className="
                rounded-3xl
                bg-white
                border border-[#6ab742]/30
                shadow-sm
                hover:shadow-xl
                transition-all duration-300
              "
            >
              <CardContent className="p-8 flex flex-col h-full">
                {/* Course Image Placeholder */}
          <div
    className="
      h-40
      rounded-2xl
      bg-[#6ab742]/10
      border border-[#6ab742]/30
      mb-6
      flex
      items-center
      justify-center
      overflow-hidden
    "
  >
    <Image 
      src={Course} 
      alt="Course Image" 
      className="object-contain w-full" 
    />
                </div>

                <h3 className="font-bold text-xl mb-3 text-[#397a34]">
                  {title}
                </h3>

                <p className="text-gray-700 flex-1 leading-relaxed">
                  Learn essential skills in {title}.
                </p>

                <Button
                  className="
                    mt-6
                    bg-[#397a34]
                    text-white
                    rounded-full
                    py-3
                    font-semibold
                    hover:bg-[#2f642b]
                    transition
                  "
                >
                  View Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
