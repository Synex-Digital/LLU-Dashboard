import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { routes } from "./Routers";

import GetStarted from "../pages/auth/GetStarted";
import SignUp from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifiedOtp from "../pages/auth/VerifiedOtp";
import NotFoundPage from "../pages/auth/NotFound";
import SetNewPassword from "../pages/auth/SetNewPassword";
import SelectUser from "../pages/auth/SelectUser";
import Home from "../pages/home/Home";
import RotLayOut from "../components/RotLayOut";
import Session from "../pages/Session";
import SessionDetails from "../pages/SessionDetails";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path={routes.getStarted.path}
                element={
                    <>
                        <Helmet>
                            <title>{routes.getStarted.title}</title>
                            <meta
                                name="description"
                                content="LLU Description"
                            />
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
                            <meta
                                name="description"
                                content="LLU Description"
                            />
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
                            <meta
                                name="description"
                                content="LLU Description"
                            />
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
                            <meta
                                name="description"
                                content="LLU Description"
                            />
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
                            <meta
                                name="description"
                                content="LLU Description"
                            />
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
                            <meta
                                name="description"
                                content="LLU Description"
                            />
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
                            <meta
                                name="description"
                                content="LLU Description"
                            />
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
                            <meta
                                name="description"
                                content="LLU Description"
                            />
                        </Helmet>
                        <SelectUser />
                    </>
                }
            />
            <Route
                path={routes.home.path}
                element={
                    <>
                        <Helmet>
                            <title>{routes.home.title}</title>
                            <meta
                                name="description"
                                content="LLU Description"
                            />
                        </Helmet>
                        <RotLayOut />
                    </>
                }
            >
                <Route
                    path={routes.dashboard.path}
                    element={
                        <>
                            <Helmet>
                                <title>{routes.dashboard.title}</title>
                                <meta
                                    name="description"
                                    content="LLU Description"
                                />
                            </Helmet>
                            <Home />
                        </>
                    }
                />
                <Route
                    path={routes.session.path}
                    element={
                        <>
                            <Helmet>
                                <title>{routes.session.title}</title>
                                <meta
                                    name="description"
                                    content="LLU Description"
                                />
                            </Helmet>
                            <Session />
                        </>
                    }
                />
                <Route
                    path={routes.sessionDetails.path}
                    element={
                        <>
                            <Helmet>
                                <title>{routes.sessionDetails.title}</title>
                                <meta
                                    name="description"
                                    content="LLU Description"
                                />
                            </Helmet>
                            <SessionDetails />
                        </>
                    }
                />
            </Route>
        </Route>
    )
);

const AppRouter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;
