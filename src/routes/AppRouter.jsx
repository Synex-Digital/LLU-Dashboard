import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import GetStarted from "../features/auth/GetStarted";
import { Helmet } from "react-helmet-async";
import { routes } from "./Routers";
import SignUp from "../features/auth/Signup";

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
