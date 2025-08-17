import styled from "styled-components";
import { breakpoints } from "./breakpoints";
import { dataGridCard, topGrid } from "./Helper";

const StyledProducts = styled.div`
  .productsGrid {
    ${topGrid}
    grid-template-rows: 1fr;

    @media ${breakpoints.md} {
      grid-template-rows: repeat(2, 1fr);
    }
  }

  .legendContainer {
    gap: 2em;
  }

  .dataGridCard {
    ${dataGridCard}
  }
`;

export default StyledProducts;
