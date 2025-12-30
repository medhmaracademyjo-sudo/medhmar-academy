
import { getPartnerById } from "@/app/server/partners/services";
import EditNewPartnerForm from "@/components/partners/editPartnerForm";
import {editpartnerAction} from "../(actions)/editPartnerAction"

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const partner = (await getPartnerById(id)).data;

  return <EditNewPartnerForm partners={partner} action={editpartnerAction} />;
}
