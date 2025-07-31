import { styled } from "styled-components";

const Badge = styled.span<{ $bgColor: string; $color: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  border: 0.6px solid;
  border-color: ${({ $bgColor }) => $bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25em;
  border-radius: 0.25em;
  font-size: 1.15rem;
  padding: 0.25em;
`;

export default Badge;
