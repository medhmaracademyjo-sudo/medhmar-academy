import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Program {
  title: string
  description: string
}

export default function ProgramsSection({ programs }: { programs: Program[] }) {
  return (
    <section className="bg-green-50">
      <div className="container mx-auto px-6 py-28">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 text-[#397a34]">
          Our Programs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {programs.map(program => (
            <Card
              key={program.title}
              className="
                rounded-3xl
                bg-white
                border border-[#6ab742]/30
                shadow-sm
                hover:shadow-xl
                transition-all duration-300
              "
            >
              <CardContent className="p-10 text-center flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-4 text-[#397a34]">
                  {program.title}
                </h3>

                <p className="text-gray-700 flex-1 mb-8 leading-relaxed">
                  {program.description}
                </p>

                <Button
                  className="
                    bg-[#397a34]
                    text-white
                    rounded-full
                    px-8
                    py-3
                    font-semibold
                    hover:bg-[#2f642b]
                    transition
                  "
                >
                  Explore Program
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
