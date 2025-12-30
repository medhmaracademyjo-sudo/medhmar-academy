import React from "react";
import CreateNewClient from "@/components/clients/createNewClientForm"
import { addClientAction } from "../(actions)/addClientAction";
async function page() {
  

  return (
   <>
   <CreateNewClient action={addClientAction}/>
   </>
  );
}

export default page;
