import EditMemberForm from "@/components/our_team/EditMemberForm"
import { editMemberAction } from "../(actions)/editMemberAction";
import { getMemberById } from "@/app/server/our_team/services";
async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const member = (await getMemberById(params.id));
  console.log("dlfgkjkgfld[w ",member);

  return (
   <>
   <EditMemberForm member={member.data}  action={editMemberAction}/>
   </>
  );
}

export default page;
