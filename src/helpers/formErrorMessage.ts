import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface Props {
  error: FetchBaseQueryError | SerializedError | undefined;
}

const formErrorMessage = (error: Props["error"]) => {
  let errorMessage = "";

  if (error && "status" in error) {
    errorMessage = JSON.stringify(error.data) || "Failed to connect.";
  } else {
    errorMessage = error?.message || "Failed to connect.";
  }

  const formattedErrorMessage = errorMessage.replace(/"/g, "");
  return formattedErrorMessage;
};

export default formErrorMessage;
