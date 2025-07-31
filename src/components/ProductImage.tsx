import React from "react";
import { Add, Edit } from "@mui/icons-material";
import StyledProductImage from "./styled/ProductImage";
import CircularProgressWithLabel from "./CircularProgress";

interface Props {
  src?: string;
  imageFileUrl?: string;
  imageFile?: File | undefined;
  progress: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductImage = ({
  src,
  imageFileUrl,
  imageFile,
  progress,
  onChange,
}: Props) => {
  return (
    <StyledProductImage>
      {imageFileUrl || src ? (
        <img src={imageFileUrl || src} alt="" />
      ) : (
        <div></div>
      )}

      {progress > 0 && progress < 100 ? (
        <CircularProgressWithLabel value={progress} />
      ) : (
        <>
          <label htmlFor="imgFileInput">
            {src || imageFile ? <Edit /> : <Add />}
          </label>
          <input type="file" id="imgFileInput" hidden onChange={onChange} />
        </>
      )}
    </StyledProductImage>
  );
};

export default ProductImage;
