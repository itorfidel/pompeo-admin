import UserForm from "./UserForm";
import { useCreateUserMutation } from "../../services/api";

const CreateUser = () => {
  const [createUser, { isSuccess, isError }] = useCreateUserMutation();

  return (
    <>
      <h1>Create New User</h1>

      <UserForm
        mutationTrigger={createUser}
        mutationSuccess={isSuccess}
        mutationError={isError}
      />
    </>
  );
};

export default CreateUser;
