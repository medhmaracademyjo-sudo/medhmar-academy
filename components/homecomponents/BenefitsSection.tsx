export default function ImpactStatementSection() {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-24 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#397a34] mb-8 animate-fadeIn">
          Closing Statement
        </h2>
        
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          The <span className="font-bold text-green-800">Itqan Initiative</span> is not merely a training program; it is a national development project that invests in people and believes that skill-building is the true path to nation-building.
        </p>
        
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          All content is carefully prepared after obtaining approvals and signing official agreements with participating entities, serving as a concise guide for what can be presented on the platform.
        </p>
        
        <p className="text-lg md:text-xl text-green-900 font-semibold text-center border-t border-green-200 pt-6">
          A national development program that invests in intellectual capital. And God grants success.
        </p>
      </div>
    </section>
  )
}
