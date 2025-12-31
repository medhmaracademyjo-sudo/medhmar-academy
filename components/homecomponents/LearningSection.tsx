import { Button } from "@/components/ui/button";
import Image from "next/image";
import Button2 from "../ui/Button2";
import Link from "next/link";

type Locale = "ar" | "en";

export default function LearningSection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";

  const content = {
    title: isAr ? "لماذا مبادرة إتقان؟" : "Why Itqan Initiative?",
    paragraphs: isAr
      ? [
          "يواجه كثير من الشباب فجوة حقيقية بين التعليم النظري ومتطلبات سوق العمل، وبين امتلاك المهارة والقدرة على الاستمرار والنجاح.",
          "جاءت مبادرة إتقان لسد هذه الفجوة، عبر نموذج تنموي عملي يركز على الإنسان باعتباره محور التنمية وأداتها وغايتها المستقبلية.",
        ]
      : [
          "Many young people face a real gap between theoretical education and labor market requirements, and between having skills and the ability to persist and succeed.",
          "The Itqan Initiative was launched to bridge this gap through a practical developmental model that focuses on humans as the center, tool, and ultimate goal of development.",
        ],
    button: isAr ? "تعرّف على المبادرة" : "Learn About the Initiative",
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-28">
        <div
          className="
            grid grid-cols-1 md:grid-cols-2
            gap-16
            items-center
            max-w-5xl
            mx-auto
            text-center md:text-left
          "
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[#397a34]">
              {content.title}
            </h2>

            {content.paragraphs.map((p, index) => (
              <p
                key={index}
                className="text-gray-700 mb-6 leading-relaxed text-lg"
              >
                {p}
              </p>
            ))}
            <Link href={"/about"}>
              <Button2>{content.button}</Button2>
            </Link>
          </div>

          <div className="relative w-full h-72 md:h-80 rounded-3xl overflow-hidden shadow-sm border border-[#6ab742]/30 order-1 md:order-2">
            <Image
              src="/itqaninitiative.jpg"
              alt={isAr ? "مبادرة إتقان" : "Itqan Initiative"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
