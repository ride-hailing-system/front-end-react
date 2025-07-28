import React, { lazy, Suspense } from "react";
import { Route, Routes as MainRoutes } from "react-router-dom";
import SuspensePage from "../pages/layouts/suspensePage";

// auth Routes constants
export const AUTH_LOGIN = "/LOGIN";
export const AUTH_FORGOT_PASSWORD = "/forgot-password";
export const AUTH_LOGOUT = "/logout";

const Routes: React.FC = () => {
  const Login = lazy(() => import("../pages/auth/login"));
  const PasswordReset = lazy(() => import("../pages/auth/forgetpassword"));
  const Logout = lazy(() => import("../pages/auth/logout"));

  PasswordReset;
  return (
    <Suspense fallback={<SuspensePage />}>
      <MainRoutes>
        <Route path={AUTH_LOGIN} element={<Login />} />
        <Route path={AUTH_FORGOT_PASSWORD} element={<PasswordReset />} />
        <Route path={AUTH_LOGOUT} element={<Logout />} />
      </MainRoutes>
    </Suspense>
  );
};

export default Routes;
