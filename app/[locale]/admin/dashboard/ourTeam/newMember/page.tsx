import { createMemberyAction } from "../(actions)/addMemberAction";
import AddMemberForm from "@/components/our_team/AddMemberForm";
async function page() {
  

  return (
   <>
   <AddMemberForm  action={createMemberyAction}/>
   </>
  );
}

export default page;
