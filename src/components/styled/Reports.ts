import { styled } from "styled-components";
import { breakpoints } from "./breakpoints";

const StyledReports = styled.div`
  section {
    margin-bottom: 5em;
  }

  .chartLgContainer {
    flex: 2;
    border-right: 0.6px solid #343b4f;
    padding-right: 4em;

    @media ${breakpoints.lg} {
      padding-right: 2.5em;
    }

    @media ${breakpoints.md} {
      width: 100%;
      border-right: none;
      border-bottom: 0.6px solid #343b4f;
      padding-right: 0;
      padding-bottom: 2em;
    }
  }

  .chartSmContainer {
    flex: 1;
    height: 100%;
    padding-left: 3em;

    @media ${breakpoints.lg} {
      padding-left: 2em;
    }

    @media ${breakpoints.md} {
      width: 100%;
      padding-left: 0;
      margin-top: 2em;
    }

    &:not(:last-child) {
    }

    .responsive {
      @media ${breakpoints.md} {
        width: 100%;
      }
    }

    .revenue {
      padding-bottom: 0.5em;
      border-bottom: 0.6px solid #343b4f;
      @extend .responsive;
    }

    .expenses {
      padding-top: 1.5em;
      @extend .responsive;
    }
  }
`;

export const TotalRevenue = styled.div`
  flex: 3;
`;

export default StyledReports;
