import React from "react";
import { Add, Edit, Person } from "@mui/icons-material";
import StyledUserImage from "./styled/UserImage";

interface Props {
  src?: string;
  style?: React.CSSProperties;
  className?: string;
  bgIconSize?: string;
  showLabel?: boolean;
  imageFileUrl?: string;
  imageFile?: File | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserImage = ({
  src,
  style,
  className,
  bgIconSize,
  showLabel,
  imageFileUrl,
  imageFile,
  onChange,
}: Props) => {
  return (
    <StyledUserImage className={className} style={style}>
      {imageFileUrl || src ? (
        <img src={imageFileUrl || src} alt="" loading="lazy" />
      ) : (
        <div className="bgIcon">
          <Person style={{ fontSize: bgIconSize }} />
        </div>
      )}
      {showLabel && (
        <>
          <label htmlFor="imgFileInput">
            {src || imageFile ? <Edit /> : <Add />}
          </label>
          <input type="file" id="imgFileInput" hidden onChange={onChange} />
        </>
      )}
    </StyledUserImage>
  );
};

export default UserImage;
