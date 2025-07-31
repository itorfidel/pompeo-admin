import React from "react";
import Flex from "../../components/styled/Flex";

interface Props {
  style?: React.CSSProperties;
  dotStyle?: React.CSSProperties;
  color: string;
  title: string;
}

const Legend = ({ style, dotStyle, color, title }: Props) => {
  return (
    <Flex
      style={{
        gap: "0.7em",
        fontSize: "1.25rem",
        ...style,
      }}
    >
      <span
        style={{
          backgroundColor: color,
          width: "0.8em",
          height: "0.8em",
          borderRadius: "50%",
          display: "inline-block",
          ...dotStyle,
        }}
      ></span>
      <span style={{ color: color }}>{title}</span>
    </Flex>
  );
};

export default Legend;
