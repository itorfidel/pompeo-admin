import { styled } from "styled-components";
import { breakpoints } from "./breakpoints";
import { topGrid } from "./Helper";

const StyledReports = styled.div`
  section {
    margin-bottom: 5em;
  }

  .cardHeaderGrid {
    grid-template-columns: repeat(4, 1fr);
    margin-top: 3em;

    @media ${breakpoints.lg} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.md} {
      grid-template-columns: 1fr;
    }

    &Icon {
      font-size: 2.5rem;
    }
  }

  .chartsCard {
    margin-top: 1.5em;
    padding: 3em;

    @media ${breakpoints.lg} {
      padding: 2em;
    }
  }

  .legendStyles {
    gap: 2em;
  }

  .orderHistoryGrid {
    ${topGrid}
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
