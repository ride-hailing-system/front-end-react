import React from "react";
import { Navigate } from "react-router-dom";

export type userRole = "admin" | "user";

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
  extraProps: { role: userRole };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  extraProps,
  ...rest
}) => {
  const isAuthenticated = !!localStorage.getItem("currentUser");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const roleNames: any = {
    admin: "admin",
    user: "user",
  };

  if (!isAuthenticated) {
    if (currentUser?.role === extraProps?.role || true) {
      return <Component {...rest} />;
    } else {
      return (
        <Navigate
          to='/auth/login'
          state={`You must have ${
            roleNames[extraProps?.role]
          } previlage to access this page`}
        />
      );
    }
  } else {
    return <Navigate to='/auth/login' />;
  }
};

export default ProtectedRoute;
