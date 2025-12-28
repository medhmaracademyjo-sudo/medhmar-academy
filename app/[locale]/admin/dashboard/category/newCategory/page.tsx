import { createCategoryAction } from "../(actions)/createCategoryAction";
import AddCategoryForm from "@/components/category/CreateCategoryForm";
async function page() {
  

  return (
   <>
   <AddCategoryForm  action={createCategoryAction}/>
   </>
  );
}

export default page;
