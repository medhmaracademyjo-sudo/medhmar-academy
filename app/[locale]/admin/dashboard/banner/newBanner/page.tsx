import CreateNewBanner from "@/components/banners/CreateBannerForm"
import { createBannerAction } from "../(actions)/createBannerAction";
async function page() {
  

  return (
   <>
   <CreateNewBanner  action={createBannerAction}/>
   </>
  );
}

export default page;
