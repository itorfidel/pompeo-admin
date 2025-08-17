import React from "react";
import Flex from "../../components/styled/Flex";
import StyledLegend from "../../components/styled/Legend";

interface Props {
  style?: React.CSSProperties;
  dotStyle?: React.CSSProperties;
  color: string;
  title: string;
}

const Legend = ({ style, dotStyle, color, title }: Props) => {
  return (
    <StyledLegend
      style={{
        ...style,
      }}
    >
      <span
        className="dot"
        style={{
          backgroundColor: color,
          ...dotStyle,
        }}
      ></span>
      <span>{title}</span>
    </StyledLegend>
  );
};

export default Legend;
