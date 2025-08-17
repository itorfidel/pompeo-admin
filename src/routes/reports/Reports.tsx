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
import Container from "../../components/styled/Container";
import TooltipStyles from "../../components/styled/TooltipStyles";

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

  const expenses = useMemo(() => {
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
      <Container>
        <section>
          <h1>Reports Overview</h1>
          <Grid $gap="1.5em" className="cardHeaderGrid">
            <DashboardCard>
              <CardHeader
                titleSm="Earnings (Monthly)"
                titleLg={`${getCurrentKpiFigure(revenue, "revenue")}K`}
                right={<AttachMoney className="cardHeaderIcon" />}
                badgeBgColor="#05c16833"
                badgeColor="#14ca74"
                badgeTxt="17.9%"
                badgeSvg={<TrendingUp />}
              />
            </DashboardCard>
            <DashboardCard>
              <CardHeader
                titleSm="Expenses (Monthly)"
                titleLg={`${getCurrentKpiFigure(
                  expenses,
                  "Operational Expenses"
                )}K`}
                right={<Paid className="cardHeaderIcon" />}
                badgeBgColor="#ff5a6533"
                badgeColor="#ff5a65"
                badgeTxt="9.6%"
                badgeSvg={<TrendingDown />}
              />
            </DashboardCard>
            <DashboardCard>
              <CardHeader
                titleSm="Orders (Monthly)"
                titleLg={"4K"}
                right={<ShoppingCart className="cardHeaderIcon" />}
                badgeBgColor="#05c16833"
                badgeColor="#14ca74"
                badgeTxt="7.4%"
                badgeSvg={<TrendingUp />}
              />
            </DashboardCard>
            <DashboardCard>
              <CardHeader
                titleSm="New Customers (Monthly)"
                titleLg="572"
                right={<GroupAdd className="cardHeaderIcon" />}
                badgeBgColor="#05c16833"
                badgeColor="#14ca74"
                badgeTxt="8.3%"
                badgeSvg={<TrendingUp />}
              />
            </DashboardCard>
          </Grid>
          <DashboardCard className="chartsCard">
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
                  <Flex className="legendStyles">
                    <Legend color="#469be0" title="Revenue" />
                    <Legend color="#40c1b8" title="Expenses" />
                  </Flex>
                }
              >
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
                      <stop offset="5%" stopColor="#469be0" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#469be0" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorExpenses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#40c1b8" stopOpacity={0.4} />
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
                    contentStyle={TooltipStyles}
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
              </ChartContainer>
              <div className="chartSmContainer">
                <TotalRevenue className="revenue" size="small" />
                <ChartContainer
                  titleLg={`${getTotalKpiFigure(
                    expenses,
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
                    <Flex className="legendStyles">
                      <Legend color="#469be0" title="Non Oper" />
                      <Legend color="#40c1b8" title="Oper" />
                    </Flex>
                  }
                >
                  <LineChart data={expenses}>
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="#848dac65"
                    />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      stroke="#aeb9e1dc"
                      style={{ fontSize: "1.1rem" }}
                    />
                    <Tooltip
                      contentStyle={TooltipStyles}
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
          <Grid $gap="1.5em" className="orderHistoryGrid">
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
      </Container>
    </StyledReports>
  );
};

export default Reports;
