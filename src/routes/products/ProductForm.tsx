import React, { useEffect, useState } from "react";
import StyledButton from "../../components/styled/Button";
import DashboardCard from "../../components/styled/DashboardCard";
import Input from "../../components/Input";
import { LocalCafeOutlined, Title, AttachMoney } from "@mui/icons-material";
import Grid from "../../components/styled/Grid";
import { Alert } from "@mui/material";
import firebaseConfig from "../../firebase/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { ProductsProps } from "../../services/types";
import ProductImage from "../../components/ProductImage";
import useUploadImage from "../../hooks/uploadImage";
import StyledTextarea from "../../components/styled/Textarea";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import useWindowWidth from "../../hooks/getWindowWidth";
import { initialProduct } from "../../initialState";
import { handleEventChange, handleInputFile } from "../../helpers/handleEvents";

interface Props {
  product?: ProductsProps;
  mutationSuccess: boolean;
  mutationError: boolean;
  mutationTrigger: MutationTrigger<
    MutationDefinition<
      ProductsProps,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      "kpis" | "user" | "product" | "transaction",
      void,
      "main"
    >
  >;
}

const ProductForm = ({
  product,
  mutationSuccess,
  mutationError,
  mutationTrigger,
}: Props) => {
  const [imageFile, setImageFile] = useState<File>();
  const [imageFileUrl, setImageFileUrl] = useState("");
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [body, setBody] = useState<ProductsProps>(product || initialProduct);
  const [isUpdate, setIsUpdate] = useState(true);
  const { width } = useWindowWidth();

  const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const db = getFirestore(app);

  useUploadImage(imageFile, setImageUploadUrl, setUploadProgress);

  useEffect(() => {
    if (Object.keys(body).some((value) => value === "")) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [imageUploadUrl, body]);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, price, desc, category } = body;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...data } = body;

    if (title || price || desc || category || imageUploadUrl) {
      if (product) {
        const productUpdate = {
          ...product,
          ...body,
          image: imageUploadUrl || product?.image,
        };

        mutationTrigger(productUpdate);
      } else {
        const newProduct = {
          ...data,
          image: imageUploadUrl,
        };

        mutationTrigger(newProduct);
      }
    }
  };

  return (
    <DashboardCard style={{ margin: "3em auto 5em" }}>
      <form onSubmit={handleUpdate}>
        {mutationSuccess ? (
          <Alert
            severity="success"
            style={{ fontSize: "1.3rem", marginBottom: "1em" }}
          >
            Success<strong>:</strong> Profile{" "}
            {product?.title ? "Updated" : "Created"} Successfully!
          </Alert>
        ) : mutationError ? (
          <Alert
            severity="error"
            style={{ fontSize: "1.3rem", marginBottom: "1em" }}
          >
            Error<strong>:</strong> Profile not{" "}
            {product?.title ? "Updated" : "Created"}!
          </Alert>
        ) : (
          ""
        )}
        <div>
          <ProductImage
            src={product?.image}
            imageFileUrl={imageFileUrl}
            imageFile={imageFile}
            progress={uploadProgress}
            onChange={(e) => handleInputFile(e, setImageFile, setImageFileUrl)}
          />
          <Grid
            $gtCols={width <= 540 ? "1fr" : "repeat(2, 1fr)"}
            $gap="2em"
            style={{ width: "100%", marginBlock: "4em" }}
          >
            <Input
              type="text"
              svg={<Title />}
              label="Title"
              id="title"
              placeholder="Enter title"
              defaultValue={product?.title}
              onChange={(e) => {
                handleEventChange(e, setBody);
              }}
            />
            <Input
              type="text"
              svg={<AttachMoney />}
              label="Price"
              id="price"
              placeholder="Enter price"
              defaultValue={product?.price}
              onChange={(e) => {
                handleEventChange(e, setBody);
              }}
            />
            <Input
              type="text"
              svg={<LocalCafeOutlined />}
              label="Category"
              id="category"
              placeholder="Enter category"
              defaultValue={product?.category}
              onChange={(e) => {
                handleEventChange(e, setBody);
              }}
            />
          </Grid>
        </div>

        <div style={{ marginBottom: "4em" }}>
          <label
            htmlFor="desc"
            style={{
              marginBottom: "0.8em",
              fontSize: "1.2rem",
              fontWeight: "500",
              display: "inline-block",
            }}
          >
            Description
          </label>
          <StyledTextarea
            name="desc"
            id="desc"
            placeholder="Enter description"
            defaultValue={product?.desc}
            onChange={(e) => {
              setBody((state) => ({
                ...state,
                desc: e.target.value,
              }));
            }}
          ></StyledTextarea>
        </div>
        <StyledButton
          type="submit"
          name="submit"
          style={{
            color: isUpdate ? "inherit" : "#656565",
          }}
          disabled={isUpdate ? false : true}
        >
          {!product?.title ? "Create" : "Update"}
        </StyledButton>
      </form>
    </DashboardCard>
  );
};

export default ProductForm;
