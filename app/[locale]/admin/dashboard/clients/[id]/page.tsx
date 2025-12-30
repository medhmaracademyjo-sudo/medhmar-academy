
import { getClientById } from "@/app/server/clients/services";
import EditClientForm from "@/components/clients/editClientForm";
import {editClientAction} from "../(actions)/editClientAction"

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const client = (await getClientById(id)).data;

  return <EditClientForm client={client} action={editClientAction} />;
}
