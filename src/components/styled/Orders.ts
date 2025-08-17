import styled from "styled-components";
import { dataGridCard, topGrid } from "./Helper";

const StyledOrders = styled.div`
  .ordersGrid {
    ${topGrid}
  }

  .dataGridCard {
    ${dataGridCard}
  }
`;

export default StyledOrders;
