import OurTeamManager from "@/components/our_team/MemberOrderManager";
import {  getMemberNameIdAndImage } from "@/app/server/our_team/services";

export default async function OurTeamPage() {
  const initialMembers = await getMemberNameIdAndImage();


  return <OurTeamManager initialMembers={initialMembers.data} />;
}
