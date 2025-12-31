



import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/header/index";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import FontSwitcher from "@/components/fontswitcher/FontSwitcher";
import { routing } from "@/i18n/routing";
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params:Promise< { locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;


  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <FontSwitcher locale={locale}>
        <div className="flex flex-col min-h-screen " dir={dir}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
                    <Footer locale={locale}/>

        </div>
      </FontSwitcher>
    </NextIntlClientProvider>
  );
}
