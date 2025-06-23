import React from "react";
import { Route, Routes as MainRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../pages/layouts";
import Dashboard from "../pages/dashboard";
import Users from "../pages/users";
import Drivers from "../pages/drivers";
import Riders from "../pages/riders";
import Rides from "../pages/rides";
import Vehicles from "../pages/vehicles";
import Setting from "../pages/setting";
import Notifications from "../pages/notifications";
import ChangePassword from "../pages/auth/changePassword";

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

const Routes: React.FC = () => (
  <AdminLayout>
    <MainRoutes>
      <Route
        path={ADMIN_DASHBOARD}
        element={
          <ProtectedRoute extraProps={{ role: "admin" }} element={Dashboard} />
        }
      />
      <Route
        path={ADMIN_USERS}
        element={
          <ProtectedRoute extraProps={{ role: "admin" }} element={Users} />
        }
      />
      <Route
        path={ADMIN_DRIVERS}
        element={
          <ProtectedRoute extraProps={{ role: "admin" }} element={Drivers} />
        }
      />
      <Route
        path={ADMIN_RIDERS}
        element={
          <ProtectedRoute extraProps={{ role: "admin" }} element={Riders} />
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
          <ProtectedRoute extraProps={{ role: "admin" }} element={Vehicles} />
        }
      />
      <Route
        path={ADMIN_SETTING}
        element={
          <ProtectedRoute extraProps={{ role: "admin" }} element={Setting} />
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
    </MainRoutes>
  </AdminLayout>
);

export default Routes;
