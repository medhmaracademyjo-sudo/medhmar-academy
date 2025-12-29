import { createProgramAction } from "../(actions)/createProgramAction";
import AddProgramForm from "@/components/program/CreateProgramForm";
async function page() {
  return (
   <>
   <AddProgramForm  action={createProgramAction} />
   </>
  );
}

export default page;
