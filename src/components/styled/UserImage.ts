import styled from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledUserImage = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #142041;
  padding: 0.35em;

  @media ${breakpoints.sm} {
    width: 32px;
    height: 32px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
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

      @media ${breakpoints.sm} {
        font-size: 26px;
      }
    }
  }

  label {
    position: absolute;
    top: 0;
    right: -0.5em;
    z-index: 999;
    background-color: #1e2f62cf;
    box-shadow: 0 2px 7px 2px #0000000f;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #ffffff;
    transition: color 0.3s;

    &:hover {
      color: inherit;
    }

    svg {
      font-size: 20px;

      @media ${breakpoints.sm} {
        font-size: 17px;
      }
    }
  }
`;

export default StyledUserImage;
