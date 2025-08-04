import { useMemo } from "react";
import DashboardCard from "../../components/styled/DashboardCard";
import CardHeader from "./CardHeader";
import {
  AttachMoney,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Paid,
  GroupAdd,
} from "@mui/icons-material";
import Grid from "../../components/styled/Grid";
import Flex from "../../components/styled/Flex";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { useGetKpisQuery } from "../../services/api";
import Legend from "../global/Legend";
import OrdersDataGrid from "../../components/OrdersDataGrid";
import { StyledButton } from "../../components/styled/Button";
import { Link } from "react-router-dom";
import useWindowWidth from "../../hooks/getWindowWidth";
import StyledReports from "../../components/styled/Reports";
import {
  getCurrentKpiFigure,
  getTotalKpiFigure,
} from "../../helpers/getKpiFigures";
import { formatCurrency, formatInteger } from "../../helpers/formats";
import TotalRevenue from "../../components/TotalRevenue";
import ChartContainer from "../../components/ChartContainer";
import UsersByDevice from "../../components/UsersByDevice";

const Reports = () => {
  const { data: kpiData } = useGetKpisQuery();
  const { width } = useWindowWidth();
  const columnWidth = width <= 540 ? 140 : width <= 768 ? 180 : 140;

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

  const revenueAndExpenses = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: formatInteger(revenue),
          expenses: formatInteger(expenses),
        };
      })
    );
  }, [kpiData]);

  const operationalExpenses = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": formatInteger(operationalExpenses),
            "Non Operational Expenses": formatInteger(nonOperationalExpenses),
          };
        }
      )
    );
  }, [kpiData]);

  return (
    <StyledReports>
      <section>
        <h1>Reports Overview</h1>
        <Grid
          $gtCols={
            width <= 768
              ? "1fr"
              : width <= 1024
              ? "repeat(2, 1fr)"
              : "repeat(4, 1fr)"
          }
          $gap="1.5em"
          style={{ marginTop: "3em" }}
        >
          <DashboardCard>
            <CardHeader
              titleSm="Earnings (Monthly)"
              titleLg={`${getCurrentKpiFigure(revenue, "revenue")}K`}
              right={<AttachMoney sx={{ fontSize: "2.5rem" }} />}
              badgeBgColor="#05c16833"
              badgeColor="#14ca74"
              badgeTxt="17.9%"
              BadgeSvg={<TrendingUp />}
            />
          </DashboardCard>
          <DashboardCard>
            <CardHeader
              titleSm="Expenses (Monthly)"
              titleLg={`${getCurrentKpiFigure(
                operationalExpenses,
                "Operational Expenses"
              )}K`}
              right={<Paid sx={{ fontSize: "2.5rem" }} />}
              badgeBgColor="#ff5a6533"
              badgeColor="#ff5a65"
              badgeTxt="9.6%"
              BadgeSvg={<TrendingDown />}
            />
          </DashboardCard>
          <DashboardCard>
            <CardHeader
              titleSm="Orders (Monthly)"
              titleLg={"4K"}
              right={<ShoppingCart sx={{ fontSize: "2.5rem" }} />}
              badgeBgColor="#05c16833"
              badgeColor="#14ca74"
              badgeTxt="7.4%"
              BadgeSvg={<TrendingUp />}
            />
          </DashboardCard>
          <DashboardCard>
            <CardHeader
              titleSm="New Customers (Monthly)"
              titleLg="572"
              right={<GroupAdd sx={{ fontSize: "2.5rem" }} />}
              badgeBgColor="#05c16833"
              badgeColor="#14ca74"
              badgeTxt="8.3%"
              BadgeSvg={<TrendingUp />}
            />
          </DashboardCard>
        </Grid>
        <DashboardCard
          style={{ marginTop: "1.5em", padding: width <= 1024 ? "2em" : "3em" }}
        >
          <Flex $direction={width <= 768 ? "column" : "row"}>
            <ChartContainer
              className="chartLgContainer"
              titleLg={`${getTotalKpiFigure(revenue, "revenue")}K`}
              titleSm="Total Revenue"
              badgeBgColor="#05c16833"
              badgeColor="#14ca74"
              badgeTxt="22.5%"
              badgeSvg={<TrendingUp />}
              size="large"
              right={
                <Flex
                  style={{
                    gap: "2em",
                  }}
                >
                  <Legend color="#469be0" title="Revenue" />
                  <Legend color="#40c1b8" title="Expenses" />
                </Flex>
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueAndExpenses}
                  margin={{
                    top: 40,
                    right: 0,
                    left: -12,
                    bottom: 8,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#848dac65"
                  />
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#469be0" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#469be0" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorExpenses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#40c1b8" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#40c1b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: "1.1rem" }}
                    stroke="#aeb9e1dc"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    hide={width <= 768 ? true : false}
                    style={{ fontSize: "1.1rem" }}
                    stroke="#aeb9e1dc"
                    domain={[8000, 24000]}
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
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#469be0"
                    fontSize="1.1rem"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#40c1b8"
                    fontSize="1.1rem"
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="chartSmContainer">
              <TotalRevenue className="revenue" size="small" />
              <ChartContainer
                titleLg={`${getTotalKpiFigure(
                  operationalExpenses,
                  "Operational Expenses"
                )}K`}
                titleSm="Expenses breakdown"
                badgeBgColor="#ff5a6533"
                badgeColor="#ff5a65"
                badgeTxt="13.2%"
                badgeSvg={<TrendingDown />}
                className="expenses"
                size="small"
                right={
                  <Flex
                    style={{
                      gap: "2em",
                    }}
                  >
                    <Legend color="#469be0" title="Non Oper" />
                    <Legend color="#40c1b8" title="Oper" />
                  </Flex>
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={operationalExpenses}>
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="#848daca7"
                    />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      stroke="#aeb9e1dc"
                      style={{ fontSize: "1.1rem" }}
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
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="Operational Expenses"
                      stroke="#40c1b8"
                      dot={false}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="Non Operational Expenses"
                      stroke="#469be0"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </Flex>
        </DashboardCard>
      </section>

      <section>
        <Flex $justify="space-between">
          <h1>Recent Orders</h1>

          <Link to="/orders">
            <StyledButton>View order history</StyledButton>
          </Link>
        </Flex>
        <Grid
          $gtCols={width <= 768 ? "1fr" : "repeat(2, 1fr)"}
          $gap="1.5em"
          style={{ marginTop: "3em" }}
        >
          <UsersByDevice />
          <DashboardCard style={{ width: "100%", overflowX: "auto" }}>
            <h3 style={{ margin: "0 0 1em 0.5em", color: "#ffffff" }}>
              Most Recent
            </h3>
            <OrdersDataGrid
              columnWidth={columnWidth}
              recent={true}
              showActionsColumn={false}
              hideFooter={true}
            />
          </DashboardCard>
        </Grid>
      </section>
    </StyledReports>
  );
};

export default Reports;
