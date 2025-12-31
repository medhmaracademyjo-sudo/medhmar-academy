import Link from "next/link";
import Button2 from "../ui/Button2";

export default function LifeCTA({ isAr }: { isAr: boolean }) {
  return (
    <section className="py-24  bg-white">
      <h2 className="text-3xl centert md:text-4xl font-extrabold mb-6 text-[#397a34]">
        {isAr ? "ابدأ اليوم" : "Get Started Today"}
      </h2>

      <p className="text-gray-700 centert text-lg md:text-xl mb-8 max-w-xl mx-auto">
        {isAr
          ? "انضم إلى برامج الحياة وابدأ تطوير مهاراتك الآن."
          : "Join our life programs and start improving your skills now."}
      </p>
<Link href={"/programs/form"}>
      <Button2 className="justify-self-center flex">
        {isAr ? "البدء الآن" : "Start Now"}
      </Button2>
      </Link>
    </section>
  )
}
