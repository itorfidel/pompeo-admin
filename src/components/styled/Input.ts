import { styled } from "styled-components";

const StyledInput = styled.div`
  .error {
    color: red;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .inputContainer {
    position: relative;
    width: 100%;

    svg {
      position: absolute;
      top: 50%;
      left: 0.6em;
      transform: translateY(-50%);
      font-size: 2rem;
      color: #c7d3ff;
    }

    input {
      padding: 1em 1.5em 1em 2.8em;
      width: 100%;
      font-size: 1.35rem;
      border: 0.6px solid #343b4f;
      border-radius: 0.4em;
      background-color: #080f25;

      &::placeholder {
        color: #848dab;
        font-size: 1.38rem;
      }

      &:focus {
        border: 0.6px solid #525d7d;
        box-shadow: 0 3px 7px #0a0a160f;

        &.inputError {
          border: 0.6px solid red;
        }
      }
    }
  }
`;

export default StyledInput;
