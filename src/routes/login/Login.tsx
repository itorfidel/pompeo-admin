import React, { useState } from "react";
import DashboardCard from "../../components/styled/DashboardCard";
import Input from "../../components/Input";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { LoginProps } from "../../services/types";
import { useLoginMutation } from "../../services/api";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/userSlice";
import handleScrollToTop from "../../helpers/scrollToTop";
import StyledButton from "../../components/styled/Button";
import {
  handleEventBlurCapture,
  handleEventChange,
} from "../../helpers/handleEvents";
import { triggerError, triggerErrorMessage } from "../../helpers/errorTriggers";
import { networkError } from "../../initialState";
import StyledLogin from "../../components/styled/Login";

const initialBody: LoginProps = {
  email: "",
  password: "",
};

const initialIsError = {
  email: false,
  password: false,
};

const initialServerErrorMsg = {
  email: "",
  password: "",
};

const clientErrorMessage = {
  email: "Email is required",
  password: "Password is required",
};

const Login = () => {
  const [body, setBody] = useState<LoginProps>(initialBody);
  const [login] = useLoginMutation({});
  const [isClientError, setIsClientError] = useState(initialIsError);
  const [isServerError, setIsServerError] = useState(initialIsError);
  const [serverErrorMsg, setServerErrorMsg] = useState(initialServerErrorMsg);
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(body).some((value) => value === "")) {
      triggerError(isClientError, true, setIsClientError);
    } else {
      await login(body)
        .unwrap()
        .then((user) => {
          dispatch(setUser(user));
          setBody(initialBody);
          handleScrollToTop();
        })
        .catch((error) => {
          const { data: errorData } = error;

          switch (errorData?.type) {
            case "emailError":
              triggerError(isServerError, false, setIsServerError, {
                email: true,
              });
              triggerErrorMessage(
                initialServerErrorMsg,
                "",
                setServerErrorMsg,
                { email: errorData.message }
              );
              break;
            case "passwordError":
              triggerError(isServerError, false, setIsServerError, {
                password: true,
              });
              triggerErrorMessage(
                initialServerErrorMsg,
                "",
                setServerErrorMsg,
                { password: errorData.message }
              );
              break;
            case "adminError":
              triggerError(isServerError, true, setIsServerError);
              triggerErrorMessage(
                initialServerErrorMsg,
                errorData.message,
                setServerErrorMsg
              );
              break;
            default:
              triggerError(isServerError, true, setIsServerError);
              triggerErrorMessage(
                initialServerErrorMsg,
                networkError.message,
                setServerErrorMsg
              );
              break;
          }
        });
    }
  };

  return (
    <StyledLogin>
      <DashboardCard className="card">
        <h1>Login</h1>
        <form className="form" onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Enter your email"
            label="Email"
            id="email"
            svg={<EmailOutlined />}
            isClientError={isClientError.email}
            clientErrorMessage={clientErrorMessage.email}
            isServerError={isServerError.email}
            serverErrorMessage={serverErrorMsg.email}
            onBlurCapture={(e) => handleEventBlurCapture(e, setIsClientError)}
            onChange={(e) => handleEventChange(e, setBody)}
            style={{ marginBottom: "2.5em" }}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            label="Password"
            id="password"
            svg={<LockOutlined />}
            isClientError={isClientError.password}
            clientErrorMessage={clientErrorMessage.password}
            isServerError={isServerError.password}
            serverErrorMessage={serverErrorMsg.password}
            onBlurCapture={(e) => handleEventBlurCapture(e, setIsClientError)}
            onChange={(e) => handleEventChange(e, setBody)}
          />
          <StyledButton type="submit" name="submit" className="submitBtn">
            Login
          </StyledButton>
        </form>
      </DashboardCard>
    </StyledLogin>
  );
};

export default Login;
