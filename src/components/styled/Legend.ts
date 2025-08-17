import { styled } from "styled-components";

const StyledLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-size: 1.2rem;

  .dot {
    width: 0.7em;
    height: 0.7em;
    border-radius: 50%;
    display: inline-block;
  }
`;

export default StyledLegend;
