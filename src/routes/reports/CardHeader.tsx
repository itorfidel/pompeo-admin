import React from "react";
import Flex from "../../components/styled/Flex";
import Badge from "../../components/styled/Badge";
import StyledCardHeader from "../../components/styled/CardHeader";

interface Props {
  titleSm: string;
  titleLg: string;
  right?: React.ReactElement;
  badgeBgColor: string;
  badgeColor: string;
  badgeTxt: string;
  badgeSvg?: React.ReactElement;
  style?: React.CSSProperties;
}

const CardHeader = ({
  titleSm,
  titleLg,
  right,
  badgeBgColor,
  badgeColor,
  badgeTxt,
  badgeSvg,
  style,
}: Props) => {
  return (
    <StyledCardHeader>
      <Flex $justify="space-between" style={{ ...style }}>
        <div>
          <h4 className="titleSm">{titleSm}</h4>
          <Flex>
            <h1 className="titleLg">{titleLg}</h1>
            <Badge $bgColor={badgeBgColor} $color={badgeColor}>
              {badgeTxt} {badgeSvg}
            </Badge>
          </Flex>
        </div>
        <div>{right}</div>
      </Flex>
    </StyledCardHeader>
  );
};

export default CardHeader;
