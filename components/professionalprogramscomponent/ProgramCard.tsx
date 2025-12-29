import { Button } from "@/components/ui/button";
import { translatedProgram } from "@/types";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import Button2 from "../ui/Button2";

interface ProgramCardProps {
  program: translatedProgram;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300 flex flex-col">
      
      {program.image && (
        <div className="relative w-full h-52">
          <img
            src={program.image}
            alt={program.program_title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-[#397a34] mb-2">
          {program.program_title}
        </h3>

        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
          {program.program_description}
        </p>

        <div className="flex flex-col gap-2 text-gray-600 text-sm mb-4">
          {/* عدد الأيام */}
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-700" />
            <span>{program.duration_d ? `${program.duration_d} days` : "-"}</span>
          </div>

          {/* عدد الساعات */}
          <div className="flex items-center gap-2">
            <FaClock className="text-green-700" />
            <span>{program.duration_h ? `${program.duration_h} hours` : "-"}</span>
          </div>
        </div>

        <div className="mt-auto">
          <Link href={`/programs/professional-programs/${program.slug}`}>
            <Button2 className="w-full">
              View Details
            </Button2>
          </Link>
        </div>
      </div>
    </div>
  );
}
