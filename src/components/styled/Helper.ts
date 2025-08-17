import { css } from "styled-components";
import { breakpoints } from "./breakpoints";

export const topGrid = css`
  grid-template-columns: repeat(2, 1fr);
  margin-top: 3em;

  @media ${breakpoints.md} {
    grid-template-columns: 1fr;
  }
`;

export const dataGridCard = css`
  margin: 2.5em auto 5em;
  width: 100%;
  overflow-x: auto;

  @media ${breakpoints.xl} {
    width: 95vw;
  }

  @media ${breakpoints.md} {
    width: 93vw;
  }

  @media ${breakpoints.sm} {
    width: 90vw;
  }
`;
