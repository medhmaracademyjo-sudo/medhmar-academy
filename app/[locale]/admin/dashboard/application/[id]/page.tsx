import { getAllApplicationsByFilters } from "@/app/server/applications/services";
import { deleteApplicationAction } from "../(actions)/deleteApplicationAction";
import { ApplicationColumns } from "@/components/columns/applications-columns";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getProgramNameAndIdById } from "@/app/server/programs/services";
import ApplicationsFilter from "@/components/aplications/ApplicationsFilter"
import { ApplicationsDataTable } from "@/components/Applications-data-table";
import ExportButton from "@/components/ExportButton";

interface Props {
  searchParams: Promise<{
   location?: string | null;
  gender?: "male" | "female" | null;
  minAge?: number | null; 
  maxAge?: number | null; 
  applicationId?:string|null,
    page?:number
  }>;
  params: Promise<{ id: string }>;
}

async function page({ params, searchParams }: Props) {
  const id = (await params).id;
  const searchParamsData = await searchParams;
  const page = Number(searchParamsData.page ?? 1);
  const filters = {
    programId: id,
    gender: searchParamsData.gender ?? null,
    location: searchParamsData.location ?? null,
    minAge: searchParamsData.minAge ? Number(searchParamsData.minAge) : null,
    maxAge: searchParamsData.maxAge ? Number(searchParamsData.maxAge) : null,
    applicationId: searchParamsData.applicationId ?? null,
  };

  const programDetails= (await getProgramNameAndIdById(id)).data

  
  const filteredData= await getAllApplicationsByFilters(page,filters)

  return  <div className="flex flex-col justify-start items-start ml-5 md:ml-7 w-[88vw] md:w-[68vw] xl:w-[80vw] ">
      <h1 className="text-2xl font-semibold mb-4  border-b p-1 w-full  ">Applications On {programDetails?.program_title_en}</h1>
  <ApplicationsFilter
  initialLocation={searchParamsData.location ?? ""}
  initialGender={searchParamsData.gender ?? null}   
  initialMinAge={searchParamsData.minAge ?? undefined}  
  initialMaxAge={searchParamsData.maxAge ?? undefined}
  
/>

<div className="mt-4 mb-4 flex items-center gap-3">
</div>

       {filteredData.data.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Applications Found
            </h3>
           
          </CardContent>
        </Card>
      ) : (
        <>
          <ApplicationsDataTable
            columns={ApplicationColumns}
            data={filteredData.data}
            routeName="applicationById"
            deleteAction={deleteApplicationAction}
            totalPages={filteredData.totalPages}
             programId={id}
    location={searchParamsData.location ?? null}
    gender={searchParamsData.gender ?? null}
    minAge={searchParamsData.minAge ?? undefined}
    maxAge={searchParamsData.maxAge ?? undefined}
    applicationId={searchParamsData.applicationId ?? null}
          />
         

        </>
      )}
    </div>;
}

export default page;
