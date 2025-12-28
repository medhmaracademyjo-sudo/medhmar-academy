import { getAllCategoriesIdAndName } from "@/app/server/category/services";
import { createProgramAction } from "../(actions)/createProgramAction";
import AddProgramForm from "@/components/program/CreateProgramForm";
async function page() {
  const allCategoriesIdAndName=  (await getAllCategoriesIdAndName()).data
  return (
   <>
   <AddProgramForm  action={createProgramAction} allCategoriesIdAndName={allCategoriesIdAndName}/>
   </>
  );
}

export default page;
