import { Button } from "@/components/ui/button"

export default function LifeCTA({ isAr }: { isAr: boolean }) {
  return (
    <section className="py-24 text-center bg-white">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[#397a34]">
        {isAr ? "ابدأ اليوم" : "Get Started Today"}
      </h2>

      <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl mx-auto">
        {isAr
          ? "انضم إلى برامج الحياة وابدأ تطوير مهاراتك الآن."
          : "Join our life programs and start improving your skills now."}
      </p>

      <Button className="bg-[#397a34] text-white px-10 py-3 hover:bg-green-700">
        {isAr ? "البدء الآن" : "Start Now"}
      </Button>
    </section>
  )
}
