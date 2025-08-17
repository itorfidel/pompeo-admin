import { ResponsiveContainer } from "recharts";
import CardHeader from "../routes/reports/CardHeader";
import StyledChartContainer from "./styled/ChartContainer";
import React from "react";

interface Props {
  className?: string;
  titleLg: string;
  titleSm?: string;
  badgeBgColor: string;
  badgeColor: string;
  badgeTxt: string;
  badgeSvg?: React.ReactElement;
  right?: React.ReactElement;
  children: React.ReactElement;
  styleMain?: React.CSSProperties;
  styleHeader?: React.CSSProperties;
  size: "small" | "medium" | "large";
}

const ChartContainer = ({
  className,
  titleLg,
  titleSm,
  badgeBgColor,
  badgeColor,
  badgeTxt,
  badgeSvg,
  right,
  children,
  styleMain,
  styleHeader,
  size,
}: Props) => {
  return (
    <StyledChartContainer className={className} style={styleMain}>
      <CardHeader
        titleLg={titleLg}
        titleSm={titleSm || ""}
        badgeBgColor={badgeBgColor}
        badgeColor={badgeColor}
        badgeTxt={badgeTxt}
        badgeSvg={badgeSvg}
        right={right}
        style={styleHeader}
      />
      <div
        className={`container ${
          size == "small"
            ? "small"
            : size == "medium"
            ? "medium"
            : size == "large"
            ? "large"
            : ""
        }`}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </StyledChartContainer>
  );
};

export default ChartContainer;
