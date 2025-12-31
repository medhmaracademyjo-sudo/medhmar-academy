import Button2 from "../ui/Button2";
import Link from "next/link";

export default function ProfessionalCTA({ isAr }: { isAr: boolean }) {
  return (

    <section className="py-24 text-center bg-white">
      <h2 className="text-3xl centert md:text-4xl font-extrabold mb-6 text-[#397a34]">
        {isAr ? "ابدأ اليوم" : "Get Started Today"}
      </h2>

      <p className="text-gray-700 centert text-lg md:text-xl mb-8 max-w-xl mx-auto">
        {isAr
          ? "انضم إلى البرامج الاحترافية وارتق بمهاراتك المهنية الآن."
          : "Join our professional programs and advance your skills today."}
      </p>

  <Link href={"/programs/form"}>
      <Button2 className="justify-self-center flex">
        {isAr ? "البدء الآن" : "Start Now"}
      </Button2>
      </Link>
    </section>
  )
}
