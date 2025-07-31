import { styled } from "styled-components";

const StyledSidebarLinks = styled.li`
  &:hover,
  &.active {
    color: #ffffff;
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.5em;
    width: 100%;
    padding: 1em 0;
    transition: 0.3s;
  }

  svg {
    font-size: 2rem;
  }
`;

export default StyledSidebarLinks;
