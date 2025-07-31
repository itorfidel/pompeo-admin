import React from "react";
import Flex from "../../components/styled/Flex";
import Badge from "../../components/styled/Badge";

interface Props {
  titleSm: string;
  titleLg: string;
  right?: React.ReactElement;
  badgeBgColor: string;
  badgeColor: string;
  badgeTxt: string;
  BadgeSvg?: React.ReactElement;
  style?: React.CSSProperties;
}

const CardHeader = ({
  titleSm,
  titleLg,
  right,
  badgeBgColor,
  badgeColor,
  badgeTxt,
  BadgeSvg,
  style,
}: Props) => {
  return (
    <Flex $justify="space-between" style={{ ...style }}>
      <div>
        <h4 style={{ marginBottom: "1em" }}>{titleSm}</h4>
        <Flex>
          <h1 style={{ marginRight: "0.25em" }}>{titleLg}</h1>
          <Badge $bgColor={badgeBgColor} $color={badgeColor}>
            {badgeTxt} {BadgeSvg}
          </Badge>
        </Flex>
      </div>
      <div>{right}</div>
    </Flex>
  );
};

export default CardHeader;
