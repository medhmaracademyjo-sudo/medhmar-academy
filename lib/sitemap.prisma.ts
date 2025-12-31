import  prisma  from "@/lib/prisma";

export async function fetchLifeProgramSlugs() {
  return prisma.programs.findMany({
    where: {
      program_type: "life_programs",
    },
    select: {
      slug: true,
    },
  });
}

export async function fetchProfessionalProgramSlugs() {
  return prisma.programs.findMany({
    where: {
      program_type: "professional_programs",
    },
    select: {
      slug: true,
    },
  });
}
