import { NextRequest } from "next/server";
import ExcelJS from "exceljs";
import { getAllApplicationsByFilters } from "@/app/server/applications/services";

type Filters = {
  programId?: string | null;
  location?: string | null;
  gender?: "male" | "female" | null;
  minAge?: number | null;
  maxAge?: number | null;
  applicationId?: string | null;
};

type applicationDetails = {
  id: string;
  name: string;
  gender: "male" | "female";
  email: string;
  phone_number: string;
  location: string;
  education_level: string;
  program_id: string | null;
  major: string;
  date_of_birth: string | Date | null;
  created_at: string | Date | null;
  programs: { program_title_en: string } | null;
};

function formatDateOnly(value?: string | Date | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  // YYYY-MM-DD
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatHumanDateTime(value?: string | Date | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  // Human friendly with day/month name and time in Asia/Amman timezone
  // Example output: "29 Dec 2025, 14:05"
  try {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Amman",
    }).format(d);
  } catch {
    // Fallback
    return d.toLocaleString();
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const filters: Filters = {
      programId: params.get("programId") ?? undefined,
      location: params.get("location") ?? undefined,
      gender: (params.get("gender") as "male" | "female") ?? undefined,
      minAge: params.get("minAge") ? Number(params.get("minAge")) : undefined,
      maxAge: params.get("maxAge") ? Number(params.get("maxAge")) : undefined,
      applicationId: params.get("applicationId") ?? undefined,
    };

    // collect all pages
    const allRows: applicationDetails[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const res = await getAllApplicationsByFilters(page, {
        programId: filters.programId ?? null,
        location: filters.location ?? null,
        gender: filters.gender ?? null,
        minAge: filters.minAge ?? null,
        maxAge: filters.maxAge ?? null,
        applicationId: filters.applicationId ?? null,
      });

      const data = res.data ?? [];
      totalPages = res.totalPages ?? 1;
      allRows.push(...data);
      page++;
    } while (page <= totalPages);

    // build workbook
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Applications");

    // define columns (customize fields to match your application object)
    sheet.columns = [
      { header: "Application ID", key: "applicationId", width: 40 },
      { header: "Full Name", key: "fullName", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone Number", key: "phone", width: 18 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Location", key: "location", width: 20 },
      { header: "Program Name", key: "programName", width: 30 },
      { header: "Submitted At", key: "createdAt", width: 25 },
      { header: "Education Level", key: "education_level", width: 20 },
      { header: "Major", key: "major", width: 20 },
      { header: "Date Of Birth", key: "dateOfBirth", width: 15 },
    ];

    // normalize each application into the columns above
    for (const app of allRows) {
      sheet.addRow({
        applicationId: app.id ?? "",
        fullName: app?.name ?? "",
        email: app?.email ?? "",
        phone: app.phone_number ?? "",
        gender: app.gender ?? "",
        location: app.location ?? "",
        programName: app.programs?.program_title_en ?? "",
        education_level: app.education_level ?? "",
        major: app.major ?? "",
        // date_of_birth as YYYY-MM-DD (no T, no Z, no time)
        dateOfBirth: formatDateOnly(app.date_of_birth),
        // created_at human friendly (Asia/Amman) e.g. "29 Dec 2025, 14:05"
        createdAt: formatHumanDateTime(app.created_at),
      });
    }

    // optional: make header bold
    sheet.getRow(1).font = { bold: true };

    // generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const bufferNode = Buffer.from(buffer as ArrayBuffer);

    const safeProgram = (filters.programId ?? "all").replace(/[^a-z0-9-_]/gi, "_");
    const fileName = `applications-${safeProgram}.xlsx`;

    return new Response(bufferNode, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err: any) {
    // better console logging for debugging
    console.error("Export to Excel failed:", {
      message: err?.message ?? err,
      stack: err?.stack ?? null,
    });

    // return JSON with helpful error message (useful for frontend)
    const body = {
      error: "ExportToExcelFailed",
      message: err?.message ?? "Unknown error during Excel export",
    };
    return new Response(JSON.stringify(body), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
