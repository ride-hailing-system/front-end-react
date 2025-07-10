import React, { lazy, Suspense } from "react";
import { Route, Routes as MainRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../pages/layouts";
import SuspensePage from "../pages/layouts/suspensePage";

// admin Routes constants
export const ADMIN_DASHBOARD = "/dashboard";
export const ADMIN_USERS = "/users";
export const ADMIN_DRIVERS = "/drivers";
export const ADMIN_RIDERS = "/riders";
export const ADMIN_RIDES = "/rides";
export const ADMIN_VEHICLES = "/vehicles";
export const ADMIN_SETTING = "/setting";
export const ADMIN_NOTIFICATIONS = "/notifications";
export const ADMIN_CHANGE_PASSWORD = "/change-password";
export const ADMIN_DRIVER_DETAIL_PAGE = "/driver-detail/:userId";

const Routes: React.FC = () => {
  const Dashboard = lazy(() => import("../pages/dashboard"));
  const RegisterdUserList = lazy(
    () => import("../pages/users/registerdUserList")
  );
  const Rides = lazy(() => import("../pages/rides"));
  const Vehicles = lazy(() => import("../pages/vehicles"));
  const Setting = lazy(() => import("../pages/setting"));
  const Notifications = lazy(() => import("../pages/notifications"));
  const ChangePassword = lazy(() => import("../pages/auth/changePassword"));
  const PageNotFound = lazy(() => import("../pages/PageNotFound"));
  const DriverDetailPage = lazy(() => import("../pages/users/driverDetails"));

  return (
    <AdminLayout>
      <Suspense fallback={<SuspensePage />}>
        <MainRoutes>
          <Route
            path={ADMIN_DASHBOARD}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={Dashboard}
              />
            }
          />
          <Route
            path={ADMIN_USERS}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={RegisterdUserList}
              />
            }
          />
          <Route
            path={ADMIN_DRIVER_DETAIL_PAGE}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={DriverDetailPage}
              />
            }
          />
          <Route
            path={ADMIN_DRIVERS}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={RegisterdUserList}
              />
            }
          />
          <Route
            path={ADMIN_RIDERS}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={RegisterdUserList}
              />
            }
          />
          <Route
            path={ADMIN_RIDES}
            element={
              <ProtectedRoute extraProps={{ role: "admin" }} element={Rides} />
            }
          />
          <Route
            path={ADMIN_VEHICLES}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={Vehicles}
              />
            }
          />
          <Route
            path={ADMIN_SETTING}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={Setting}
              />
            }
          />
          <Route
            path={ADMIN_NOTIFICATIONS}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={Notifications}
              />
            }
          />
          <Route
            path={ADMIN_CHANGE_PASSWORD}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={ChangePassword}
              />
            }
          />
          <Route
            path={"/*"}
            element={
              <ProtectedRoute
                extraProps={{ role: "admin" }}
                element={PageNotFound}
              />
            }
          />
        </MainRoutes>
      </Suspense>
    </AdminLayout>
  );
};

export default Routes;
