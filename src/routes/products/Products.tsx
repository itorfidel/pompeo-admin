import { useState, useMemo } from "react";
import StyledButton from "../../components/styled/Button";
import TableDataGrid from "../../components/TableDataGrid";
import { Delete, Edit, TrendingUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ProductsProps } from "../../services/types";
import { GridColDef } from "@mui/x-data-grid";
import {
  useDeleteProductMutation,
  useGetAllProductsMutation,
} from "../../services/api";
import DashboardCard from "../../components/styled/DashboardCard";
import Flex from "../../components/styled/Flex";
import handleScrollToTop from "../../helpers/scrollToTop";
import handleDeleteData from "../../helpers/deleteData";
import useWindowWidth from "../../hooks/getWindowWidth";
import { formatCurrency } from "../../helpers/formats";
import ChartContainer from "../../components/ChartContainer";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  RadialBarChart,
  RadialBar,
} from "recharts";
import Legend from "../global/Legend";
import Grid from "../../components/styled/Grid";
import { useFetchDataMany } from "../../hooks/fetchData";

const Products = () => {
  const [getProducts] = useGetAllProductsMutation();
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [deleteProduct] = useDeleteProductMutation();
  const { width } = useWindowWidth();
  const category = "All";
  const columnWidth = width <= 540 ? 140 : width <= 768 ? 160 : 200;

  useFetchDataMany(getProducts, setProducts, category);

  const rows = useMemo(() => {
    return products.map((product) => {
      const price = formatCurrency(product.price.split("$")[1]);

      return {
        ...product,
        price,
        id: product._id,
      };
    });
  }, [products]);

  const columns: GridColDef<ProductsProps>[] = [
    {
      field: "image",
      headerName: "Image",
      width: columnWidth,
      renderCell: (params) => {
        return (
          <img
            style={{
              width: "2.8em",
              height: "2.8em",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={params.row.image}
            alt=""
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: columnWidth,
    },
    {
      field: "category",
      headerName: "Category",
      width: columnWidth,
    },
    {
      field: "price",
      headerName: "Price",
      width: columnWidth,
    },
    {
      field: "action",
      headerName: "Actions",
      width: columnWidth,
      renderCell: (params) => {
        return (
          <>
            <StyledButton
              style={{ marginRight: "1.25em", padding: "0.5em 0.8em" }}
            >
              <Link
                to={`/products/${params.row._id}`}
                state={params.row._id}
                onClick={handleScrollToTop}
              >
                <Edit titleAccess="Edit" sx={{ fontSize: "1.8rem" }} />
              </Link>
            </StyledButton>
            <StyledButton
              style={{ padding: "0.5em 0.8em" }}
              onClick={() =>
                handleDeleteData(params.row._id, deleteProduct, setProducts)
              }
            >
              <Delete titleAccess="Delete" sx={{ fontSize: "1.8rem" }} />
            </StyledButton>
          </>
        );
      },
    },
  ];

  const radialData = [
    {
      name: "Cups",
      number: 230,
      fill: "#776adb",
    },
    {
      name: "Plates",
      number: 300,
      fill: "#5973dd",
    },
    {
      name: "Mugs",
      number: 400,
      fill: "#469be0",
    },
    {
      name: "Vases",
      number: 530,
      fill: "#40c1b8",
    },
  ];

  const barData = [
    {
      name: "Gold Vase",
      revenue: 4000,
      count: 2400,
    },
    {
      name: "Gold Vase",
      revenue: 3000,
      count: 1398,
    },
    {
      name: "Gold Vase",
      revenue: 2000,
      count: 5800,
    },
    {
      name: "Gold Vase",
      revenue: 2780,
      count: 3908,
    },
    {
      name: "Gold Vase",
      revenue: 1890,
      count: 4800,
    },
    {
      name: "Gold Vase",
      revenue: 2390,
      count: 3800,
    },
    {
      name: "Gold Vase",
      revenue: 3190,
      count: 4500,
    },
    {
      name: "Gold Vase",
      revenue: 1720,
      count: 4200,
    },
  ];

  console.log("rows: ", rows);

  return (
    <>
      <Flex $justify="space-between">
        <h1>Products Overview</h1>
        <Link to="/products/create-product">
          <StyledButton>Create new product</StyledButton>
        </Link>
      </Flex>

      <Grid
        $gtCols={width <= 768 ? "1fr" : "repeat(2, 1fr)"}
        $gtRows={width <= 768 ? "repeat(2, 1fr)" : "1fr"}
        $gap="2.5em"
        style={{ marginTop: "3em", overflow: "hidden" }}
      >
        <DashboardCard>
          <Flex $direction="column" style={{ height: "100%" }}>
            <h3
              style={{
                alignSelf: "flex-start",
                color: "#ffffff",
                marginBottom: "0.25em",
              }}
            >
              Top selling by category
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="55%"
                outerRadius="90%"
                barSize={7}
                data={radialData}
                style={{ height: width < 768 ? "31em" : "21em" }}
              >
                <RadialBar
                  background={{ opacity: "0.25" }}
                  dataKey="number"
                  stroke="#0000000"
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <Flex
              $justify="center"
              style={{
                gap: "2em",
              }}
            >
              <Legend color="#40c1b8" title="Vases" />
              <Legend color="#469be0" title="Mugs" />
              <Legend color="#5973dd" title="Plates" />
              <Legend color="#776adb" title="Cups" />
            </Flex>
          </Flex>
        </DashboardCard>
        <DashboardCard>
          <h3 style={{ color: "#ffffff", marginBottom: "0.25em" }}>
            Top selling by individual item
          </h3>
          <ChartContainer
            titleLg={`400K`}
            badgeBgColor="#05c16833"
            badgeColor="#14ca74"
            badgeTxt="17.3%"
            badgeSvg={<TrendingUp />}
            size="medium"
            right={
              <Flex
                style={{
                  gap: "2em",
                }}
              >
                <Legend color="#469be0" title="Item Count" />
                <Legend color="#40c1b8" title="Revenue" />
              </Flex>
            }
            styleMain={{ justifyContent: "unset", gap: "2em" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                barSize={width <= 540 ? 10 : width <= 768 ? 15 : 10}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#848dac65"
                />
                <XAxis
                  stroke="#aeb9e1dc"
                  tickLine={false}
                  axisLine={false}
                  dataKey="name"
                />
                <YAxis
                  stroke="#aeb9e1dc"
                  tickLine={false}
                  axisLine={false}
                  width={0}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0e193fbe",
                    border: "2px solid #1c3381be",
                    backdropFilter: "blur(4px)",
                    borderRadius: "0.8em",
                    transform: "scale(85%)",
                  }}
                />
                <Bar dataKey="count" fill="#469be0" />
                <Bar dataKey="revenue" fill="#40c1b8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </DashboardCard>
      </Grid>
      <DashboardCard
        style={{
          marginBlock: "2.5em 5em",
          width: width < 1280 ? "95vw" : "100%",
          overflowX: "auto",
        }}
      >
        <TableDataGrid
          rows={rows}
          columns={columns}
          showToolbar={true}
          showActionsColumn={true}
          hideFooter={false}
        />
      </DashboardCard>
    </>
  );
};

export default Products;
