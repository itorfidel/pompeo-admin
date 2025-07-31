import { styled } from "styled-components";

const Grid = styled.div<{ $gtCols?: string; $gtRows?: string; $gap?: string }>`
  display: grid;
  grid-template-columns: ${({ $gtCols }) => $gtCols};
  grid-template-rows: ${({ $gtRows }) => $gtRows};
  gap: ${({ $gap }) => $gap};
`;

export default Grid;
