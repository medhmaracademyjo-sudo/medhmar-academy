import { getApplicationById } from "@/app/server/applications/services";
import { getProgramNameAndIdById } from "@/app/server/programs/services";
import ApplicationDetailsClient from "@/components/aplications/ApplicationDetails";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const id = (await params).id;

  const applicationRes = (await getApplicationById(id));
  const application = applicationRes?.data ?? null;

  if (!application) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Application not found</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ApplicationDetailsClient
        applicationDetails={application}
      />
    </div>
  );
}
