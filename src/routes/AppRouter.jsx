import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { routes } from "./Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GetStarted from "../pages/auth/GetStarted";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifiedOtp from "../pages/auth/VerifiedOtp";
import NotFoundPage from "../pages/auth/NotFound";
import SetNewPassword from "../pages/auth/SetNewPassword";
import Home from "../pages/home/Home";
import RotLayOut from "../components/RotLayOut";
import Session from "../pages/Session";
import SessionDetails from "../pages/SessionDetails";
import Notifications from "../pages/Notifications";
import CreateSession from "../pages/CreateSession";
import Profile from "../pages/Profile";
import FacilityView from "../pages/FacilityView";
import EditDetails from "../pages/EditDetails";
import EditFacility from "../pages/EditFacility";
import AddFacility from "../pages/AddFacility";
import AddTrainerDetails from "../pages/AddTrainerDetails";
import Settings from "../pages/Settings";
import ChangeEmailAddress from "../pages/ChangeEmailAddress";
import PublicRoute from "./PublicRoute";
import Community from "../pages/Community";
import UserProfile from "../pages/UserProfile";
import MessagePage from "../pages/MessagePage";
import SyncTrainer from "../pages/SyncTrainer";

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
            <PublicRoute>
              <GetStarted />
            </PublicRoute>
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
            <PublicRoute>
              <SignUp />
            </PublicRoute>
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
            <PublicRoute>
              <Login />
            </PublicRoute>
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
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
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
            <PublicRoute>
              <VerifiedOtp />
            </PublicRoute>
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
            <PublicRoute>
              <SetNewPassword />
            </PublicRoute>
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
        path={routes.home.path}
        element={
          <>
            <Helmet>
              <title>{routes.home.title}</title>
              <meta name="description" content="LLU Description" />
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
                <meta name="description" content="LLU Description" />
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
                <meta name="description" content="LLU Description" />
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
                <meta name="description" content="LLU Description" />
              </Helmet>
              <SessionDetails />
            </>
          }
        />
        <Route
          path={routes.notifications.path}
          element={
            <>
              <Helmet>
                <title>{routes.notifications.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <Notifications />
            </>
          }
        />

        <Route
          path={routes.createSession.path}
          element={
            <>
              <Helmet>
                <title>{routes.createSession.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <CreateSession />
            </>
          }
        />
        <Route
          path={routes.profile.path}
          element={
            <>
              <Helmet>
                <title>{routes.profile.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <Profile />
            </>
          }
        />
        <Route
          path={routes.facilityView.path}
          element={
            <>
              <Helmet>
                <title>{routes.facilityView.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <FacilityView />
            </>
          }
        />
        <Route
          path={routes.editDetails.path}
          element={
            <>
              <Helmet>
                <title>{routes.editDetails.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <EditDetails />
            </>
          }
        />
        <Route
          path={routes.editFacility.path}
          element={
            <>
              <Helmet>
                <title>{routes.editFacility.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <EditFacility />
            </>
          }
        />
        <Route
          path={routes.addFacility.path}
          element={
            <>
              <Helmet>
                <title>{routes.addFacility.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <AddFacility />
            </>
          }
        />
        <Route
          path={routes.addTrainerDetails.path}
          element={
            <>
              <Helmet>
                <title>{routes.addTrainerDetails.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <AddTrainerDetails />
            </>
          }
        />
        <Route
          path={routes.settings.path}
          element={
            <>
              <Helmet>
                <title>{routes.settings.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <Settings />
            </>
          }
        />
        <Route
          path={routes.changeEmailAddress.path}
          element={
            <>
              <Helmet>
                <title>{routes.changeEmailAddress.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <ChangeEmailAddress />
            </>
          }
        />
        <Route
          path={routes.community.path}
          element={
            <>
              <Helmet>
                <title>{routes.community.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <Community />
            </>
          }
        />
        <Route
          path={routes.userProfile.path}
          element={
            <>
              <Helmet>
                <title>{routes.userProfile.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <UserProfile />
            </>
          }
        />
        <Route
          path={routes.messages.path}
          element={
            <>
              <Helmet>
                <title>{routes.messages.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <MessagePage />
            </>
          }
        />
        <Route
          path={routes.syncTrainer.path}
          element={
            <>
              <Helmet>
                <title>{routes.syncTrainer.title}</title>
                <meta name="description" content="LLU Description" />
              </Helmet>
              <SyncTrainer />
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
};

export default AppRouter;
