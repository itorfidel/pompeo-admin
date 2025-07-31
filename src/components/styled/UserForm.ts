import styled from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledUserForm = styled.form`
  .profileImage {
    height: 30em;
    border-bottom: 5px solid #080f25;

    @media ${breakpoints.md} {
      height: 24em;
    }

    @media ${breakpoints.sm} {
      height: 19em;
    }

    .imageLg {
      height: 100%;
      border-top-left-radius: 0.75em;
      border-top-right-radius: 0.75em;
      overflow: hidden;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        inset: 0 0;
        background-color: #080f2590;
        backdrop-filter: blur(3px);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      h3 {
        position: absolute;
        bottom: 0.5em;
        left: 0;
        margin-top: 0.5em;
        margin-left: 120px;
        color: #ffffff;
        z-index: 899;

        @media ${breakpoints.sm} {
          margin-left: 95px;
        }
      }
    }
  }

  .profileForm {
    padding: 3em;
    margin-top: 5em;

    @media ${breakpoints.sm} {
      padding: 2em;
    }
  }

  .uploadProgress {
    width: 3.5em;
    height: 3.5em;
    border-radius: 50%;
    outline: 4px solid #aeb9e1;
    position: relative;

    &Outer {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background-color: white;
      width: 3.5em;
      height: 3.5em;
      border-radius: 50%;
    }

    &Inner {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 3em;
      height: 3em;
      border-radius: 50%;
      transition: 0.5s;
    }
  }

  &Field {
    flex: 1;
  }

  .input {
    margin-top: 1.5em;
  }
`;

export default StyledUserForm;
