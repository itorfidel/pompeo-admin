import { useErrorBoundary } from "react-error-boundary";
import StyledButton from "./styled/Button";
import StyledErrorHandler from "./styled/ErrorHandler";
import Flex from "./styled/Flex";

interface Props {
  error: Error;
}

const ErrorHandler = ({ error }: Props) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <StyledErrorHandler>
      <Flex $direction="column" $justify="center" style={{ height: "100%" }}>
        <div style={{ width: "80em", margin: "0 auto" }}>
          <h3 className="errorTitle">An error occured.</h3>
          <p className="errorDesc">{error.message}</p>
        </div>
        <StyledButton
          name="reset"
          style={{ padding: "1em 1.5em", fontSize: "1.5rem" }}
          onClick={resetBoundary}
        >
          Try again
        </StyledButton>
      </Flex>
    </StyledErrorHandler>
  );
};

export default ErrorHandler;
