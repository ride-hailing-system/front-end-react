import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoutes from "./adminRoutes";
import SuspensePage from "../pages/layouts/suspensePage";

const AppRoutes: React.FC = () => {
  const Login = lazy(() => import("../pages/auth/login"));
  const PasswordReset = lazy(() => import("../pages/auth/forgetpassword"));
  const PageNotFound = lazy(() => import("../pages/PageNotFound"));

  return (
    <Router>
      <Suspense fallback={<SuspensePage />}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<PasswordReset />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
