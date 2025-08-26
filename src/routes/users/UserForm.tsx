import React, { useEffect, useState } from "react";
import StyledButton from "../../components/styled/Button";
import DashboardCard from "../../components/styled/DashboardCard";
import Input from "../../components/Input";
import { EmailOutlined, PersonOutline } from "@mui/icons-material";
import Grid from "../../components/styled/Grid";
import Select from "../../components/Select";
import { selectUser, setUser } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "@mui/material";
import firebaseConfig from "../../firebase/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import StyledUserForm from "../../components/styled/UserForm";
import { UserProps } from "../../services/types";
import CircularProgressWithLabel from "../../components/CircularProgress";
import UserImage from "../../components/UserImage";
import useUploadImage from "../../hooks/uploadImage";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import useWindowWidth from "../../hooks/getWindowWidth";
import { initialUser } from "../../initialState";
import { handleEventChange, handleInputFile } from "../../helpers/handleEvents";

interface Props {
  profileUser?: UserProps;
  mutationSuccess: boolean;
  mutationError: boolean;
  mutationTrigger: MutationTrigger<
    MutationDefinition<
      UserProps,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      "kpis" | "user" | "product" | "transaction",
      void,
      "main"
    >
  >;
}

const UserForm = ({
  profileUser,
  mutationSuccess,
  mutationError,
  mutationTrigger,
}: Props) => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser);
  const [imageFile, setImageFile] = useState<File>();
  const [imageFileUrl, setImageFileUrl] = useState("");
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [body, setBody] = useState<UserProps>(profileUser || initialUser);
  const [noUpdate, setNoUpdate] = useState(true);
  const { width } = useWindowWidth();

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  console.log(db);

  useUploadImage(imageFile, setImageUploadUrl, setUploadProgress);

  useEffect(() => {
    if (Object.keys(body).some((value) => value !== "")) {
      setNoUpdate(false);
    } else {
      setNoUpdate(true);
    }
  }, [imageUploadUrl, body, profileUser?.isAdmin]);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...data } = body;

    if (Object.keys(body).some((value) => value !== "")) {
      if (profileUser?.email) {
        const isAdminUpdate = body.isAdmin || profileUser.isAdmin;

        const userUpdate = {
          ...profileUser,
          ...body,
          isAdmin: isAdminUpdate,
          profileImg: imageUploadUrl || profileUser?.profileImg,
        };

        mutationTrigger(userUpdate);

        if (profileUser?.email === loggedInUser.email) {
          dispatch(
            setUser({
              ...userUpdate,
            })
          );
        }
      } else {
        const newUser = {
          ...data,
          isAdmin: body.isAdmin,
          profileImg: imageUploadUrl,
        };

        mutationTrigger(newUser);
      }
    }
  };

  return (
    <DashboardCard style={{ margin: "3em 0 5em", padding: "0" }}>
      <StyledUserForm onSubmit={handleUpdate}>
        <div className="profileImage">
          <div className="imageLg">
            {(profileUser?.profileImg || imageFileUrl) && (
              <img src={imageFileUrl || profileUser?.profileImg} alt="" />
            )}
            <CircularProgressWithLabel value={uploadProgress} />
            <h3>{body.fullName || profileUser?.fullName || "User Name"}</h3>
          </div>
          <UserImage
            src={profileUser?.profileImg}
            showLabel={true}
            bgIconSize={width <= 540 ? "30px" : "35px"}
            imageFileUrl={imageFileUrl}
            imageFile={imageFile}
            onChange={(e) => handleInputFile(e, setImageFile, setImageFileUrl)}
            style={{
              width: width <= 540 ? "6em" : "7em",
              height: width <= 540 ? "6em" : "7em",
              bottom: "0",
              left: width <= 540 ? "2em" : "3em",
              transform: "translateY(-50%)",
            }}
          />
        </div>

        <div className="profileForm">
          <h3 style={{ marginBottom: "1.5em", color: "#ffffff" }}>
            Profile Settings
          </h3>
          {mutationSuccess ? (
            <Alert
              severity="success"
              style={{ fontSize: "1.3rem", marginBottom: "2em" }}
            >
              Success<strong>:</strong> Profile{" "}
              {profileUser?.email ? "Updated" : "Created"} Successfully!
            </Alert>
          ) : mutationError ? (
            <Alert
              severity="error"
              style={{ fontSize: "1.3rem", marginBottom: "2em" }}
            >
              Error<strong>:</strong> Profile not{" "}
              {profileUser?.email ? "Updated" : "Created"}!
            </Alert>
          ) : (
            ""
          )}
          <Grid
            $gtCols={width <= 768 ? "1fr" : "repeat(2, 1fr)"}
            $gap="2.5em 5em"
          >
            <Input
              type="text"
              placeholder="Enter your full name"
              id="fullName"
              label="Full Name"
              svg={<PersonOutline />}
              defaultValue={profileUser?.fullName}
              onChange={(e) => {
                handleEventChange(e, setBody);
              }}
            />
            <Input
              type="text"
              placeholder="Enter your email"
              id="email"
              label="Email"
              svg={<EmailOutlined />}
              defaultValue={profileUser?.email}
              onChange={(e) => {
                handleEventChange(e, setBody);
              }}
            />
            <Input
              type="text"
              placeholder="Enter your username"
              id="username"
              label="Username"
              svg={<PersonOutline />}
              defaultValue={profileUser?.username}
              onChange={(e) => {
                handleEventChange(e, setBody);
              }}
            />
            <Select defaultValue={profileUser?.isAdmin} setBody={setBody} />
          </Grid>
          <StyledButton
            type="submit"
            style={{
              marginTop: "2em",
              color: noUpdate ? "#656565" : "inherit",
              cursor: noUpdate ? "default" : "pointer",
            }}
            disabled={noUpdate ? true : false}
          >
            {!profileUser?.email ? "Create" : "Update"}
          </StyledButton>
        </div>
      </StyledUserForm>
    </DashboardCard>
  );
};

export default UserForm;
