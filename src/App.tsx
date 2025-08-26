import { lazy, Suspense } from "react";
import GlobalStyles from "./components/styled/Globals";
import Header from "./routes/global/Header";
import Sidebar from "./routes/global/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./routes/global/Footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./components/ErrorHandler";
import AppLoading from "./components/AppLoading";
import Container from "./components/styled/Container";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { removeUser, selectUser } from "./features/userSlice";
const Reports = lazy(() => import("./routes/reports/Reports"));
const Login = lazy(() => import("./routes/login/Login"));
const Orders = lazy(() => import("./routes/orders/Orders"));
const Products = lazy(() => import("./routes/products/Products"));
const UpdateProduct = lazy(() => import("./routes/products/UpdateProduct"));
const CreateProduct = lazy(() => import("./routes/products/CreateProduct"));
const Users = lazy(() => import("./routes/users/Users"));
const Profile = lazy(() => import("./routes/users/Profile"));
const CreateUser = lazy(() => import("./routes/users/CreateUser"));
const UpdateUser = lazy(() => import("./routes/users/UpdateUser"));

const App = () => {
  const { email } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  setTimeout(() => {
    dispatch(removeUser());
  }, 36000 * 1000);

  return (
    <div style={{ display: "flex" }}>
      <GlobalStyles />
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        {email && <Sidebar />}
        <div style={{ flex: "1" }}>
          <Header />
          <Container>
            <Suspense fallback={<AppLoading />}>
              <Routes>
                <Route
                  path="/"
                  element={email ? <Reports /> : <Navigate to="/login" />}
                />
                <Route
                  path="/login"
                  element={!email ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/orders"
                  element={email ? <Orders /> : <Navigate to="/login" />}
                />
                <Route
                  path="/products"
                  element={email ? <Products /> : <Navigate to="/login" />}
                />
                <Route
                  path="/products/:id"
                  element={email ? <UpdateProduct /> : <Navigate to="/login" />}
                />
                <Route
                  path="/products/create-product"
                  element={email ? <CreateProduct /> : <Navigate to="/login" />}
                />
                <Route
                  path="/users"
                  element={email ? <Users /> : <Navigate to="/login" />}
                />
                <Route
                  path="/users/:id"
                  element={email ? <UpdateUser /> : <Navigate to="/login" />}
                />
                <Route
                  path="/users/create-user"
                  element={email ? <CreateUser /> : <Navigate to="/login" />}
                />
                <Route
                  path="/profile"
                  element={email ? <Profile /> : <Navigate to="/login" />}
                />
              </Routes>
            </Suspense>
          </Container>
          <Footer />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
