import React, { lazy, Suspense } from "react";
import { Route, Routes as MainRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SuspensePage from "../pages/layouts/suspensePage";

// auth Routes constants
export const AUTH_LOGIN = "/LOGIN";
export const AUTH_FORGOT_PASSWORD = "/forgot-password";

const Routes: React.FC = () => {
  const Login = lazy(() => import("../pages/auth/login"));
  const PasswordReset = lazy(() => import("../pages/auth/forgetpassword"));
  PasswordReset;
  return (
    <Suspense fallback={<SuspensePage />}>
      <MainRoutes>
        <Route
          path={AUTH_LOGIN}
          element={
            <ProtectedRoute extraProps={{ role: "user" }} element={Login} />
          }
        />
        <Route
          path={AUTH_FORGOT_PASSWORD}
          element={
            <ProtectedRoute
              extraProps={{ role: "user" }}
              element={PasswordReset}
            />
          }
        />
      </MainRoutes>
    </Suspense>
  );
};

export default Routes;
