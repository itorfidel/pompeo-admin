import { styled } from "styled-components";

const Flex = styled.div<{
  $justify?: string;
  $direction?: string;
  $wrap?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ $justify }) => $justify};
  flex-direction: ${({ $direction }) => $direction};
  flex-wrap: ${({ $wrap }) => $wrap};
`;

export default Flex;
