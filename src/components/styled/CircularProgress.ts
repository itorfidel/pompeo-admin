import styled from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledCircularProgress = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.8em;
  padding: 1.25em;
  background-color: #1e2f62cf;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s;
  z-index: 899;

  &:hover {
    color: inherit;
  }

  svg {
    font-size: 4.5rem;
  }

  @media ${breakpoints.md} {
    padding: 0.8em;

    svg {
      font-size: 3.6rem;
    }
  }
`;

export default StyledCircularProgress;
