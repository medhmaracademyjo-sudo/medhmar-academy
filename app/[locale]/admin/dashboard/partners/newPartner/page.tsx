import React from "react";
import CreateNewPartnerForm from "@/components/partners/createNewPartnerForm";
import { addpartnerAction } from "../(actions)/addPartnerAction";
async function page() {
  return (
    <>
      <CreateNewPartnerForm action={addpartnerAction} />
    </>
  );
}

export default page;
