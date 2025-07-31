import { styled } from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledSidebar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 28em;
  height: 100vh;
  border-right: 0.6px solid #343b4f;
  background-color: #080f25;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.65s;
  z-index: 1099;

  @media ${breakpoints.xl} {
    position: fixed;
    left: 0;
    transform: translateX(-100%);

    &.show {
      transform: translateX(0);
    }
  }

  @media ${breakpoints.md} {
    width: 25em;
  }

  @media ${breakpoints.sm} {
    width: 100%;
    transition: 0.8s;
  }

  .container {
    padding: 3em;

    @media ${breakpoints.xl} {
      padding: 2.5em;
    }

    @media ${breakpoints.md} {
      padding: 2em;
    }
  }

  .mobileMenuExit {
    font-size: 2.5rem;
    align-self: flex-end;
    cursor: pointer;
    display: none;

    @media ${breakpoints.xl} {
      display: block;
    }
  }

  .sidebarList {
    h4 {
      color: #ffffff;
    }

    .linkRight {
      width: 100%;
      justify-content: space-between;
    }
  }

  .profile {
    margin-block: 3em 1em;
    cursor: pointer;

    &Outer {
      .image {
        padding: 0;
        margin-right: 1em;
      }

      h3 {
        font-size: 1.5rem;
        color: #ffffff;
      }
    }

    &Inner {
      margin: 0.5em 2em 0;
      display: none;
      transition: 0.4s ease;

      &.show {
        top: 120%;
        display: block;
      }

      .icon {
        margin-right: 0.35em;
        font-size: 1.9rem;
      }
    }
  }
`;

export default StyledSidebar;
