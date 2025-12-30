import { Button } from '@/components/ui/button'
import Button1 from '../ui/Button1'

export default function CTASection() {
  return (
    <section className="bg-[#397a34] text-white">
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Start Learning Today
        </h2>
        <p className="max-w-xl mx-auto mb-8 opacity-90 text-gray-100">
          Join thousands of students and build skills that matter.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button1 >
            Browse Courses
          </Button1>
          <Button1
     
          >
            Become an Instructor
          </Button1>
        </div>
      </div>
    </section>
  )
}
