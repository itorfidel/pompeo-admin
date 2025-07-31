import { useEffect } from "react";
import { upload } from "../firebase/firebaseController";

const useUploadImage = (
  imageFile: File | undefined,
  setImageUploadUrl: React.Dispatch<React.SetStateAction<string>>,
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    if (imageFile) {
      upload(imageFile, setImageUploadUrl, setUploadProgress);
    }
  }, [imageFile, setImageUploadUrl, setUploadProgress]);
};

export default useUploadImage;
