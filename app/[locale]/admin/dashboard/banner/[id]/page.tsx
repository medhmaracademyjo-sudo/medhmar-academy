import { getBannerById } from "@/app/server/banners/services";
import EditBannerForm from "@/components/banners/EditBannerForm"
import { editBannerAction } from "../(actions)/editBannerAction";
async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const banner = (await getBannerById(params.id));
  console.log("dlfgkjkgfld[w ",banner);

  return (
   <>
   <EditBannerForm banner={banner.data}  action={editBannerAction}/>
   </>
  );
}

export default page;
