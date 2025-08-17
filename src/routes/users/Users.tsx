import { useState, useMemo } from "react";
import StyledButton from "../../components/styled/Button";
import TableDataGrid from "../../components/TableDataGrid";
import { Delete, Edit, TrendingUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserProps } from "../../services/types";
import { GridColDef } from "@mui/x-data-grid";
import {
  useDeleteUserMutation,
  useGetAllUsersMutation,
} from "../../services/api";
import DashboardCard from "../../components/styled/DashboardCard";
import Flex from "../../components/styled/Flex";
import handleScrollToTop from "../../helpers/scrollToTop";
import handleDeleteData from "../../helpers/deleteData";
import { useFetchDataMany } from "../../hooks/fetchData";
import UserImage from "../../components/UserImage";
import useWindowWidth from "../../hooks/getWindowWidth";
import UsersByDevice from "../../components/UsersByDevice";
import Grid from "../../components/styled/Grid";
import ChartContainer from "../../components/ChartContainer";
import { Cell, Pie, PieChart } from "recharts";

type TooltipPayload = ReadonlyArray<any>;

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
  tooltipPayload?: ReadonlyArray<TooltipPayload>;
};

type GeometrySector = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

type PieLabelProps = PieSectorData &
  GeometrySector & {
    tooltipPayload?: any;
  };

const Users = () => {
  const [getUsers] = useGetAllUsersMutation();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [deleteUser] = useDeleteUserMutation();
  const { width } = useWindowWidth();
  const columnWidth = width <= 540 ? 140 : width <= 768 ? 160 : 200;

  useFetchDataMany(getUsers, setUsers);

  const rows = useMemo(() => {
    return users.map((user) => {
      return {
        ...user,
        id: user._id,
      };
    });
  }, [users]);

  const columns: GridColDef<UserProps>[] = [
    {
      field: "profileImage",
      headerName: "Profile Image",
      width: columnWidth,
      renderCell: (params) => {
        return (
          <>
            <UserImage src={params.row.profileImg} style={{ padding: "0" }} />
          </>
        );
      },
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: columnWidth,
    },
    {
      field: "username",
      headerName: "Username",
      width: columnWidth,
    },
    {
      field: "email",
      headerName: "Email",
      width: columnWidth,
    },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
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
                to={`/users/${params.row._id}`}
                state={params.row._id}
                onClick={handleScrollToTop}
              >
                <Edit titleAccess="Edit" sx={{ fontSize: "1.8rem" }} />
              </Link>
            </StyledButton>
            <StyledButton
              style={{ padding: "0.5em 0.8em" }}
              onClick={() =>
                handleDeleteData(params.row._id, deleteUser, setUsers)
              }
            >
              <Delete titleAccess="Delete" sx={{ fontSize: "1.8rem" }} />
            </StyledButton>
          </>
        );
      },
    },
  ];

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const RADIAN = Math.PI / 180;
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <Flex $justify="space-between">
        <h1>All Users</h1>
        <Link to="/users/create-user">
          <StyledButton>Create new user</StyledButton>
        </Link>
      </Flex>

      <Grid
        $gtCols={width <= 768 ? "1fr" : "repeat(2, 1fr)"}
        $gap="2.5em"
        style={{ marginTop: "3em" }}
      >
        <DashboardCard>
          <ChartContainer
            titleSm="Top selling Products"
            titleLg="400K"
            badgeBgColor="#05c16833"
            badgeColor="#14ca74"
            badgeTxt="17.3%"
            badgeSvg={<TrendingUp />}
            size="medium"
          >
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </DashboardCard>
        <UsersByDevice />
      </Grid>
      <DashboardCard
        style={{
          margin: "2.5em auto 5em",
          width:
            width < 540
              ? "90vw"
              : width < 768
              ? "93vw"
              : width < 1280
              ? "95vw"
              : "100%",
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

export default Users;
