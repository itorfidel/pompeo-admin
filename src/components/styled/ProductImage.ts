import styled from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledUProductImage = styled.div`
  position: relative;
  width: 22em;
  height: 22em;
  border-radius: 0.5em;
  padding: 0.35em;
  transition: 0.3s;

  @media ${breakpoints.md} {
    width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0 0;
    background-color: #080f2537;
    transition: 0.3s;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5em;
    object-fit: cover;
    object-position: center;
  }

  .bgIcon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 30px;
    }
  }

  label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 65px;
    height: 65px;
    border-radius: 0.8em;
    background-color: #1e2f62cf;
    box-shadow: 0 2px 7px 2px #0000000f;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    cursor: pointer;
    color: #ffffff;
    transition: color 0.3s;

    &:hover {
      color: inherit;
    }

    svg {
      font-size: 40px;
    }
  }
`;

export default StyledUProductImage;
