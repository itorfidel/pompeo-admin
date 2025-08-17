import styled from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledProductForm = styled.div`
  .card {
    margin: 3em auto 5em;
  }

  .alert {
    font-size: 1.3rem;
    margin-bottom: 1em;
  }

  .formGrid {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    margin-block: 4em;

    @media ${breakpoints.md} {
      grid-template-columns: 1fr;
    }
  }

  .textarea {
    margin-bottom: 4em;

    label {
      margin-bottom: 0.8em;
      font-size: 1.2rem;
      font-weight: 500;
      display: inline-block;
    }
  }

  .updateBtn {
    color: "#656565";
  }
`;

export default StyledProductForm;
