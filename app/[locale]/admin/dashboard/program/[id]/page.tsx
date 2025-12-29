import EditProgramForm from "@/components/program/EditProgramForm"
import { editProgramAction } from "../(actions)/editProgramAction";
import { getProgramById } from "@/app/server/programs/services";

async function page(props: { params: Promise<{ id: string }> }) {

  const params = await props.params;
  const program = (await getProgramById(params.id));
  console.log("dlfgkjkgfld[w ",program);

  return (
   <>
   <EditProgramForm program={program.data}  action={editProgramAction} />
   </>
  );
}

export default page;
