import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Flex from "../../components/styled/Flex";
import StyledButton from "../../components/styled/Button";
import {
  useGetOneUserMutation,
  useUpdateUserMutation,
} from "../../services/api";
import UserForm from "./UserForm";
import { useFetchDataOne } from "../../hooks/fetchData";
import { UserProps } from "../../services/types";
import { initialUser } from "../../initialState";

const UpdateUser = () => {
  const id: string = useLocation().state;
  const [updateUser, { isSuccess, isError }] = useUpdateUserMutation();
  const [getUser] = useGetOneUserMutation();
  const [user, setUser] = useState<UserProps>(initialUser);

  useFetchDataOne(getUser, setUser, id);

  return (
    <>
      <Flex $justify="space-between">
        <h1>Edit User</h1>
        <Link to="/users/create-user">
          <StyledButton>Create new user</StyledButton>
        </Link>
      </Flex>

      <UserForm
        profileUser={user}
        mutationTrigger={updateUser}
        mutationSuccess={isSuccess}
        mutationError={isError}
      />
    </>
  );
};

export default UpdateUser;
