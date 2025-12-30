import { PartnersColumns } from "@/components/columns/partners-columns";
import { DataTable } from "@/components/data-table";
import {deletePartnerAction}from "./(actions)/deletePartnerAction"
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllPartners } from "@/app/server/partners/services";

export default async function PartnersTable() {
  const allPartners = (await getAllPartners()).data || [];

  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[75vw] text-black">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Partners</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Partners.
        </h2>
      </div>

      {/* Conditional rendering */}
      {allPartners.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Partners Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Partners Yet.
            </p>
            <NavigationButton
              routeName="newPartner"
              value="Add New Partners"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={PartnersColumns}
            data={allPartners}
            routeName="partners"
            deleteAction={deletePartnerAction}
          />
          <NavigationButton
            routeName="newPartner"
            value="Add New partner"
          />
        </>
      )}
    </main>
  );
}
