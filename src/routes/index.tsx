import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login";
import AdminRoutes from "./adminRoutes";
import PasswordReset from "../pages/auth/passwordReset";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/password-reset' element={<PasswordReset />} />
      <Route path='/admin/*' element={<AdminRoutes />} />
    </Routes>
  </Router>
);

export default AppRoutes;
