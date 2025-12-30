
import { getSettingById } from "@/app/server/settings/services";
import { editSettingAction } from "../(fetch)/editSetting";
import EditSettingForm from "@/components/settings/editSettingForm";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const setting = await getSettingById(params.id);

  return (
    

      <main>
        <EditSettingForm setting={setting!} action={editSettingAction} />
      </main>
  );
}

export default Page;
