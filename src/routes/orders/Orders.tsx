import DashboardCard from "../../components/styled/DashboardCard";
import OrdersDataGrid from "../../components/OrdersDataGrid";
import Flex from "../../components/styled/Flex";
import StyledButton from "../../components/styled/Button";
import Grid from "../../components/styled/Grid";
import TotalRevenue from "../../components/TotalRevenue";
import useWindowWidth from "../../hooks/getWindowWidth";

const Orders = () => {
  const { width } = useWindowWidth();
  const columnWidth = width <= 540 ? 140 : width <= 768 ? 160 : 200;

  return (
    <>
      <Flex $justify="space-between">
        <h1>Orders Overview</h1>
        <StyledButton>Create New Order</StyledButton>
      </Flex>
      <Grid
        $gtCols={width <= 768 ? "1fr" : "repeat(2, 1fr)"}
        $gap="2.5em"
        style={{ marginBlock: "3em 2.5em" }}
      >
        <DashboardCard></DashboardCard>
        <DashboardCard>
          <TotalRevenue size="medium" />
        </DashboardCard>
      </Grid>
      <DashboardCard
        style={{
          marginBlock: "3em 5em",
          width: width < 1280 ? "95vw" : "100%",
          overflowX: "auto",
        }}
      >
        <OrdersDataGrid
          columnWidth={columnWidth}
          showToolbar={true}
          showActionsColumn={true}
          hideFooter={false}
        />
      </DashboardCard>
    </>
  );
};

export default Orders;
