import { Card, CardContent } from "@/components/ui/card";
import Button2 from "../ui/Button2";
import Link from "next/link";

type Locale = "ar" | "en";

export default function ProgramsSection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";

  const programs = [
    {
      title: isAr ? "البرامج الحياتية" : "Life Programs",
      description: isAr
        ? "مجموعة من البرامج التي تهدف إلى تطوير المهارات الشخصية، وتعزيز جودة الحياة، وبناء شخصية متوازنة وفعالة."
        : "A collection of programs designed to develop personal skills, enhance quality of life, and build a balanced and effective personality.",
        type:"life-programs"
    },
    {
      title: isAr ? "البرامج المهنية" : "Professional Programs",
      description: isAr
        ? "برامج متخصصة تهدف إلى تطوير المهارات العملية والمهنية ورفع الكفاءة في سوق العمل."
        : "Specialized programs aimed at developing practical and professional skills and increasing efficiency in the job market.",
          type:"professional-programs"
    },
  ];

  return (
    <section className="bg-green-50">
      <div className="container mx-auto px-6 py-28">
        <h2 className="text-3xl md:text-4xl font-extrabold centert mb-16 text-[#397a34]">
          {isAr ? "برامجنا" : "Our Programs"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {programs.map((program) => (
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
                <Link href={`/programs/${program.type}`}>
                  <Button2>
                    {isAr ? "استعرض البرامج" : "Explore Programs"}
                  </Button2>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
