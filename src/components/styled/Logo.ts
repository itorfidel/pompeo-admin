import { styled } from "styled-components";

const StyledLogo = styled.span`
  font-size: clamp(1.75rem, 2vw, 2.1rem);
  font-weight: 600;
  display: block;
  margin-top: 0.5em;
  white-space: nowrap;

  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

export default StyledLogo;
