import { CircularProgress } from "@mui/material";
import Flex from "./styled/Flex";

const AppLoading = () => {
  return (
    <Flex $justify="center" style={{ height: "90vh" }}>
      <CircularProgress disableShrink />
    </Flex>
  );
};

export default AppLoading;
