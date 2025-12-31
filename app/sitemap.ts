import {
  fetchLifeProgramSlugs,
  fetchProfessionalProgramSlugs,
} from "@/lib/sitemap.prisma";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap() {
  const now = new Date();

  // Static pages
  const staticPages = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/about`, lastModified: now },
    { url: `${SITE_URL}/mission-vision`, lastModified: now },
  ];

  // Dynamic pages from Prisma
  const lifePrograms = await fetchLifeProgramSlugs();
  const professionalPrograms = await fetchProfessionalProgramSlugs();

  const lifeUrls = lifePrograms.map((p) => ({
    url: `${SITE_URL}/programs/life-programs/${p.slug}`,
    lastModified: now,
  }));

  const professionalUrls = professionalPrograms.map((p) => ({
    url: `${SITE_URL}/programs/professional-programs/${p.slug}`,
    lastModified: now,
  }));

  return [...staticPages, ...lifeUrls, ...professionalUrls];
}
