import { styled } from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.7em;

  .container {
    padding-top: 1em;

    @media ${breakpoints.sm} {
      padding-top: 0.5em;
    }

    &.small {
      height: 17.5em;

      @media ${breakpoints.md} {
        height: 26em;
      }

      @media ${breakpoints.sm} {
        height: 22em;
      }

      @media ${breakpoints.xs} {
        height: 18em;
      }
    }

    &.medium {
      height: 21em;

      @media ${breakpoints.md} {
        height: 31em;
      }

      @media ${breakpoints.sm} {
        height: 27em;
      }

      @media ${breakpoints.xs} {
        height: 22em;
      }
    }

    &.large {
      height: 45em;

      @media ${breakpoints.md} {
        height: 40em;
      }

      @media ${breakpoints.sm} {
        height: 32em;
      }

      @media ${breakpoints.xs} {
        height: 28em;
      }
    }
  }
`;

export default StyledChartContainer;
