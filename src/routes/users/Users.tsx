import { useState, useMemo } from "react";
import StyledButton from "../../components/styled/Button";
import TableDataGrid from "../../components/TableDataGrid";
import { Delete, Edit } from "@mui/icons-material";
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

const Users = () => {
  const [getUsers] = useGetAllUsersMutation();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [deleteUser] = useDeleteUserMutation();
  const { width } = useWindowWidth();

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
      width: width <= 540 ? 100 : 120,
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
      width: width <= 540 ? 160 : 200,
    },
    {
      field: "username",
      headerName: "Username",
      width: width <= 540 ? 120 : 160,
    },
    {
      field: "email",
      headerName: "Email",
      width: width <= 540 ? 170 : 200,
    },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
      width: width <= 540 ? 100 : 120,
    },
    {
      field: "action",
      headerName: "Actions",
      width: width <= 540 ? 100 : 120,
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
        style={{ marginBlock: "3em 2.5em" }}
      >
        <DashboardCard></DashboardCard>
        <UsersByDevice />
      </Grid>
      <DashboardCard
        style={{
          marginBlock: "3em 5em",
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

export default Users;
