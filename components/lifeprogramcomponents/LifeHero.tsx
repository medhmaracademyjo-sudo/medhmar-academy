export default function LifeHero({ isAr }: { isAr: boolean }) {
  return (
    <section className="relative bg-[#397a34] text-white py-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl centert md:text-5xl font-extrabold mb-6">
          {isAr ? "برامج الحياة" : "Life Programs"}
        </h1>

        <p className="max-w-2xl centert mx-auto text-lg md:text-xl text-white/90 leading-relaxed">
          {isAr
            ? "طور حياتك ومهاراتك الشخصية مع برامج حياتية مبتكرة ومميزة."
            : "Enhance your life and personal skills with innovative and impactful life programs."}
        </p>
      </div>

      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
    </section>
  )
}
