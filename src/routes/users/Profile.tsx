import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useGetOneUserMutation,
  useUpdateUserMutation,
} from "../../services/api";
import { UserProps } from "../../services/types";
import { useFetchDataOne } from "../../hooks/fetchData";
import UserForm from "./UserForm";
import { initialUser } from "../../initialState";

const Profile = () => {
  const id: string = useLocation().state;
  const [getUser] = useGetOneUserMutation();
  const [updateUser, { isSuccess, isError }] = useUpdateUserMutation();
  const [profileUser, setProfileUser] = useState<UserProps>(initialUser);

  useFetchDataOne(getUser, setProfileUser, id);

  return (
    <>
      <h1>Account Settings</h1>

      <UserForm
        profileUser={profileUser}
        mutationTrigger={updateUser}
        mutationSuccess={isSuccess}
        mutationError={isError}
      />
    </>
  );
};

export default Profile;
