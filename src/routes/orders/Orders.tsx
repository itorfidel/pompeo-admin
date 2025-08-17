import DashboardCard from "../../components/styled/DashboardCard";
import OrdersDataGrid from "../../components/OrdersDataGrid";
import Flex from "../../components/styled/Flex";
import StyledButton from "../../components/styled/Button";
import Grid from "../../components/styled/Grid";
import TotalRevenue from "../../components/TotalRevenue";
import useWindowWidth from "../../hooks/getWindowWidth";
import { XAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import ChartContainer from "../../components/ChartContainer";
import { TrendingDown } from "@mui/icons-material";
import { formatCurrency, formatInteger } from "../../helpers/formats";
import { useMemo } from "react";
import { useGetKpisQuery } from "../../services/api";
import TooltipStyles from "../../components/styled/TooltipStyles";
import StyledOrders from "../../components/styled/Orders";

const Orders = () => {
  const { data: kpiData } = useGetKpisQuery();
  const { width } = useWindowWidth();
  const columnWidth = width <= 540 ? 140 : width <= 768 ? 160 : 200;

  const expenses = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(({ month, operationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          expenses: formatInteger(operationalExpenses),
        };
      })
    );
  }, [kpiData]);

  return (
    <StyledOrders>
      <Flex $justify="space-between">
        <h1>Orders Overview</h1>
        <StyledButton>Create New Order</StyledButton>
      </Flex>
      <Grid $gap="2.5em" className="ordersGrid">
        <DashboardCard>
          <TotalRevenue size="medium" />
        </DashboardCard>
        <DashboardCard>
          <ChartContainer
            titleLg="4K"
            titleSm="Expenses breakdown"
            badgeBgColor="#ff5a6533"
            badgeColor="#ff5a65"
            badgeTxt="13.2%"
            badgeSvg={<TrendingDown />}
            size="medium"
          >
            <LineChart data={expenses}>
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
                contentStyle={TooltipStyles}
                formatter={(v) => formatCurrency(v.toString())}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="expenses"
                stroke="#40c1b8"
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </DashboardCard>
      </Grid>
      <DashboardCard className="dataGridCard">
        <OrdersDataGrid
          columnWidth={columnWidth}
          showToolbar={true}
          showActionsColumn={true}
          hideFooter={false}
        />
      </DashboardCard>
    </StyledOrders>
  );
};

export default Orders;
