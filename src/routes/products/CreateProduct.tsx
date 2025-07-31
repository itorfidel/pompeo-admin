import ProductForm from "./ProductForm";
import { useCreateProductMutation } from "../../services/api";

const CreateProduct = () => {
  const [createProduct, { isSuccess, isError }] = useCreateProductMutation();

  return (
    <>
      <h1>Create New Product</h1>

      <ProductForm
        mutationTrigger={createProduct}
        mutationSuccess={isSuccess}
        mutationError={isError}
      />
    </>
  );
};

export default CreateProduct;
