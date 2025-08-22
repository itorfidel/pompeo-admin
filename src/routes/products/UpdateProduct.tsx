import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Flex from "../../components/styled/Flex";
import StyledButton from "../../components/styled/Button";
import {
  useGetOneProductMutation,
  useUpdateProductMutation,
} from "../../services/api";
import { ProductsProps } from "../../services/types";
import { useFetchDataOne } from "../../hooks/fetchData";
import ProductForm from "./ProductForm";

const UpdateProduct = () => {
  const id: string = useLocation().state;
  const [getProduct] = useGetOneProductMutation();
  const [updateProduct, { isSuccess, isError }] = useUpdateProductMutation();
  const [product, setproduct] = useState<ProductsProps>({});

  useFetchDataOne(getProduct, setproduct, id);

  return (
    <>
      <Flex $justify="space-between">
        <h1>Edit Product</h1>
        <Link to="/products/create-product">
          <StyledButton>Create new product</StyledButton>
        </Link>
      </Flex>

      <ProductForm
        product={product}
        mutationTrigger={updateProduct}
        mutationSuccess={isSuccess}
        mutationError={isError}
      />
    </>
  );
};

export default UpdateProduct;
