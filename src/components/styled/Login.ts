import { styled } from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledLogin = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .card {
    width: 37em;

    @media ${breakpoints.xs} {
      width: 100%;
    }
  }

  .form {
    margin-top: 4em;
  }

  .submitBtn {
    width: 100%;
    margin-top: 5em;
    padding: 1em 0;
    font-size: 1.4rem;
  }
`;

export default StyledLogin;
