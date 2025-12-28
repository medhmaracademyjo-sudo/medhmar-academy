export default function BenefitsSection({ benefits }: { benefits: string[] }) {
  return (
    <section className="bg-white border-t border-black/10">
      <div className="container mx-auto px-6 py-24">
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-[#397a34]">
          Why Learn With Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map(item => (
            <div
              key={item}
              className="
                rounded-2xl
                bg-green-50
                p-8
                text-center
                font-semibold
                text-gray-800
                border border-black/10
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
