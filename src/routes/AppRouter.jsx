import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { routes } from "./Routers";

import GetStarted from "../features/auth/GetStarted";
import SignUp from "../features/auth/Signup";
import Login from "../features/auth/Login";
import ForgotPassword from "../features/auth/ForgotPassword";
import VerifiedOtp from "../features/auth/VerifiedOtp";
import NotFoundPage from "../features/auth/NotFound";
import SetNewPassword from "../features/auth/SetNewPassword";
import SelectUser from "../features/auth/SelectUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path={routes.getStarted.path}
        element={
          <>
            <Helmet>
              <title>{routes.getStarted.title}</title>
              <meta name="description" content="LLU Description" />
            </Helmet>
            <GetStarted />
          </>
        }
      ></Route>
      <Route
        path={routes.signup.path}
        element={
          <>
            <Helmet>
              <title>{routes.signup.title}</title>
              <meta name="description" content="LLU Description" />
            </Helmet>
            <SignUp />
          </>
        }
      ></Route>
      <Route
        path={routes.login.path}
        element={
          <>
            <Helmet>
              <title>{routes.login.title}</title>
              <meta name="description" content="LLU Description" />
            </Helmet>
            <Login />
          </>
        }
      ></Route>
      <Route
        path={routes.forgotPassword.path}
        element={
          <>
            <Helmet>
              <title>{routes.forgotPassword.title}</title>
              <meta name="description" content="LLU Description" />
            </Helmet>
            <ForgotPassword />
          </>
        }
      ></Route>
      <Route
        path={routes.verifiedOtp.path}
        element={
          <>
            <Helmet>
              <title>{routes.verifiedOtp.title}</title>
              <meta name="description" content="LLU Description" />
            </Helmet>
            <VerifiedOtp />
          </>
        }
      ></Route>
      <Route
        path={routes.setNewPassword.path}
        element={
          <>
            <Helmet>
              <title>{routes.setNewPassword.title}</title>
              <meta name="description" content="LLU Description" />
            </Helmet>
            <SetNewPassword />
          </>
        }
      ></Route>
      <Route
        path={routes.notFound.path}
        element={
          <>
            <Helmet>
              <title>{routes.notFound.title}</title>
              <meta name="description" content="LLU Description" />
            </Helmet>
            <NotFoundPage />
          </>
        }
      />
      <Route
        path={routes.selectUser.path}
        element={
          <>
            <Helmet>
              <title>{routes.selectUser.title}</title>
              <meta name="description" content="LLU Description" />
            </Helmet>
            <SelectUser />
          </>
        }
      />
    </Route>,
  ),
);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
