import { styled } from "styled-components";
import { breakpoints } from "./breakpoints";
import StyledButton from "./Button";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: #101935be;
  border-bottom: 0.6px solid #343b4f;
  box-shadow: 3px 2px 7px #14142b0f;
  z-index: 999;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(10px);
    padding-block: 1.2em;
  }

  .mobileMenu {
    width: 2em;
    height: 2em;
    cursor: pointer;
    display: none;

    @media ${breakpoints.xl} {
      display: block;
    }

    @media ${breakpoints.sm} {
      width: 1.8em;
      height: 1.8em;
    }
  }
`;

export const HeaderButton = styled(StyledButton)`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5em;
  z-index: 999;

  @media ${breakpoints.md} {
    width: 2.7em;
    height: 2.7em;
  }

  svg {
    font-size: 2.2rem;
  }
`;

export default StyledHeader;
