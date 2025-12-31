import ProgramCard from "@/components/lifeprogramcomponents/ProgramCard"
import { translatedProgram } from "@/types"
type Locale = "ar" | "en";

type CoursesSectionProps = {
  courses: translatedProgram[]
  locale:Locale
}





export default function CoursesSection({ courses,locale }: CoursesSectionProps) {
    const isAr = locale === "ar";
  return (
    <section className="bg-green-50">
      <div className="container mx-auto px-6 py-28">
             <h2 className="text-3xl md:text-4xl font-extrabold centert mb-16 text-[#397a34]">
          {isAr ? "البرامج المميزة" : "Featured Courses "}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl justify-self-center">
          {courses.map((program) => (
            <ProgramCard
              key={program.id ?? program.slug}
              program={program}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
