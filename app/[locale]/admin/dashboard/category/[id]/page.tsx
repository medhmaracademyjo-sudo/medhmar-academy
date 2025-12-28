import EditCategoryForm from "@/components/category/EditCategoryForm"
import { editCategoryAction } from "../(actions)/editCategoryAction";
import { getCategoryById } from "@/app/server/category/services";
async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const category = (await getCategoryById(params.id));
  console.log("dlfgkjkgfld[w ",category);

  return (
   <>
   <EditCategoryForm category={category.data}  action={editCategoryAction}/>
   </>
  );
}

export default page;
