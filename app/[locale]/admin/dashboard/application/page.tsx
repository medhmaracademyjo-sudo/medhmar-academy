import Link from "next/link";
import Image from "next/image";
import DefaultImage from "@/public/programImage.png";
import { getProgramsByType } from "@/app/server/programs/services";
async function page() {
  const allLifePrograms = (await getProgramsByType("life_programs")).data;
  const allProfessionalPrograms = (
    await getProgramsByType("professional_programs")
  ).data;

  return (
    <main className=" ml:0 md:ml-2.5 lg:ml-5 mt-2">
      <header className="mb-4">
        <h1 className=" ml-2 text-xl lg:text-3xl font-semibold">
          All Programs by Category
        </h1>
        <p className="text-gray-600 mt-1 ml-2">
          Browse programs grouped by category
        </p>
      </header>

      {allLifePrograms && (
        <div className="space-y-12 mt-8">
          <h2 className="text-2xl w-[95vw] ml-1 lg:ml-0 md:w-[70vw] lg:w-[80vw] font-semibold border-b pb-2 text-center flex flex-row justify-center">
            Life Programs
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {allLifePrograms.map((program, j) => (
              <Link
                key={j}
                href={`/admin/dashboard/application/${program.id}`}
                className="group flex flex-col items-center gap-2 text-center hover:scale-105 transition-transform duration-500 ease-in-out"
              >
                <div className="w-44 h-44 rounded-full overflow-hidden flex items-center justify-center border shadow-md bg-gray-50 hover:shadow-lg">
                  <Image
                    src={program.image ?? DefaultImage}
                    alt={program.program_title_en}
                    width={50}
                    height={50}
                    className="w-full h-full object-contain"
                  />
                  
                </div>
                <div className="text-sm font-medium truncate max-w-36 mt-2">
                  {program.program_title_en}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full
                   bg-[#397a34]/10 text-[#397a34] font-semibold">
    {program.applications.length}
  </span>
  <span className="whitespace-nowrap">Applications</span>
</div>

              </Link>
            ))}
          </div>
        </div>
      )}
      {allProfessionalPrograms && (
        <div className="space-y-12 mt-16 mb-16">
          <h2 className="text-2xl w-[95vw] ml-1 lg:ml-0 md:w-[70vw] lg:w-[80vw] font-semibold border-b pb-2 text-center flex flex-row justify-center">
            Professional Programs
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {allProfessionalPrograms.map((program, j) => (
              <Link
                key={j}
                href={`/admin/dashboard/application/${program.id}`}
                className="group flex flex-col items-center gap-2 text-center hover:scale-105 transition-transform duration-500 ease-in-out"
              >
                <div className="w-44 h-44 rounded-full overflow-hidden flex items-center justify-center border shadow-md bg-gray-50 hover:shadow-lg">
                  <Image
                    src={program.image ?? DefaultImage}
                    alt={program.program_title_en}
                    width={50}
                    height={50}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-sm font-medium truncate max-w-36 mt-2">
                  {program.program_title_en}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full
                   bg-[#397a34]/10 text-[#397a34] font-semibold">
    {program.applications.length}
  </span>
  <span className="whitespace-nowrap">Applications</span>
</div>

              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default page;
