import { styled } from "styled-components";

const StyledErrorHandler = styled.div`
  height: 100vh;
  width: 100%;
  text-align: center;

  .errorTitle {
    white-space: nowrap;
    margin-bottom: 0.5em;
    font-size: 1.8rem;
    font-weight: 400;
    color: #ffffff;
  }

  .errorDesc {
    margin-bottom: 1.5em;
    font-size: 1.4rem;
  }
`;

export default StyledErrorHandler;
