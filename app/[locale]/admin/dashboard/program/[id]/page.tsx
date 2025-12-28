import EditProgramForm from "@/components/program/EditProgramForm"
import { editProgramAction } from "../(actions)/editProgramAction";
import { getAllCategoriesIdAndName } from "@/app/server/category/services";
import { getProgramById } from "@/app/server/programs/services";

async function page(props: { params: Promise<{ id: string }> }) {

  const params = await props.params;
  const program = (await getProgramById(params.id));
  const allCategoriesIdAndName=  (await getAllCategoriesIdAndName()).data
  console.log("dlfgkjkgfld[w ",program);

  return (
   <>
   <EditProgramForm program={program.data}  action={editProgramAction} allCategoriesIdAndName={allCategoriesIdAndName}/>
   </>
  );
}

export default page;
