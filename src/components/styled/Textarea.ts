import { styled } from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 13em;
  background-color: #080f25;
  color: #c7d3ff;
  padding: 1em 1.5em;
  font-size: 1.5rem;
  outline: 0;
  border: 0.6px solid #343b4f;
  border-radius: 0.25em;

  &::placeholder {
    color: #848dab;
    font-size: 1.38rem;
  }

  &:focus {
    border: 0.6px solid #525d7d;
    box-shadow: 0 3px 7px #0a0a160f;
  }
`;

export default StyledTextarea;
