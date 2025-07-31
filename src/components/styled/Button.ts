import { styled } from "styled-components";
import { breakpoints } from "./breakpoints";

export const StyledButton = styled.button`
  background-color: #1e2f6297;
  padding: 0.8em 1em;
  border-radius: 0.5em;
  color: #ffffff;
  transition: background-color 0.3s;
  z-index: 1;

  @media ${breakpoints.sm} {
    font-size: 1.15rem;
  }

  &:hover {
    background-color: #283e80b9;
  }

  &:active {
    background-color: #324ea1b9;
  }
`;

export default StyledButton;
