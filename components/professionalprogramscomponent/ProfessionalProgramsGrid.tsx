import { translatedProgram } from "@/types";
import ProgramCard from "./ProgramCard";

interface ProfessionalProgramsGridProps {
  programs: translatedProgram[];
}

export default function ProfessionalProgramsGrid({
  programs,
}: ProfessionalProgramsGridProps) {
  return (
    <section className="container mx-auto px-24 py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {programs.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </section>
  );
}
