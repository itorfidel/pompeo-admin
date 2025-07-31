import { styled } from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledFooter = styled.footer`
  padding: 3em;
  border-top: 0.6px solid #343b4f;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5rem;
    text-align: center;

    @media ${breakpoints.sm} {
      font-size: 1.3rem;
    }
  }

  a {
    color: #ffffff;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      color: #7088de;
    }
  }
`;

export default StyledFooter;
