import Button2 from "@/components/ui/Button2";
import Link from "next/link";

type Locale = "en" | "ar";

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const texts = {
    ar: {
      title: "شكراً لتقديمك!",
      message: "سيتم التواصل معك قريباً.",
    },
    en: {
      title: "Thank you for your submission!",
      message: "We will contact you soon.",
    },
  };

  const t = texts[locale];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6 text-center">
      <h1 className="mb-5 text-4xl md:text-5xl font-extrabold text-[#397a34]">
        {t.title}
      </h1>
      <p className="mb-10 text-lg md:text-xl text-[#397a34]/90">{t.message}</p>
<Link href={"/"}>
      <Button2>
         {isAr ? "العودة للصفحة الرئيسية" : "Back To Home"}
      </Button2>
      </Link>

    </div>
  );
}
