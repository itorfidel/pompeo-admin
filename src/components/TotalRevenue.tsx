import { TrendingUp } from "@mui/icons-material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import useWindowWidth from "../hooks/getWindowWidth";
import { formatCurrency, formatInteger } from "../helpers/formats";
import { useGetKpisQuery } from "../services/api";
import { useMemo } from "react";
import { getTotalKpiFigure } from "../helpers/getKpiFigures";
import ChartContainer from "./ChartContainer";

interface Props {
  className?: string;
  size: "small" | "medium" | "large";
}

const TotalRevenue = ({ className, size }: Props) => {
  const { data: kpiData } = useGetKpisQuery();
  const { width } = useWindowWidth();

  const revenue = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: formatInteger(revenue),
        };
      })
    );
  }, [kpiData]);

  return (
    <ChartContainer
      className={className}
      titleLg={`${getTotalKpiFigure(revenue, "revenue")}K`}
      titleSm="Revenue Breakdown"
      badgeBgColor="#05c16833"
      badgeColor="#14ca74"
      badgeTxt="22.5%"
      badgeSvg={<TrendingUp />}
      size={size}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={revenue}
          barSize={width <= 540 ? 10 : width <= 768 ? 15 : 10}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#848daca7"
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "1.1rem" }}
            stroke="#aeb9e1dc"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0e193fbe",
              border: "2px solid #1c3381be",
              backdropFilter: "blur(4px)",
              borderRadius: "0.8em",
              transform: "scale(85%)",
            }}
            formatter={(v) => formatCurrency(v.toString())}
          />
          <Bar dataKey="revenue" fill="#469be0" opacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TotalRevenue;
