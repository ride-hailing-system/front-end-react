import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_SESSION_BY_ID } from "../graphql/queries/auth";
import { ApolloErrorFormatter } from "../graphql/apolloErrorFormatter";
import toast from "react-hot-toast";
import { UserContext } from "../store/context/userContext";

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
  const { userData, setUserData } = useContext(UserContext);

  // const roleNames: any = {
  //   admin: "admin",
  //   user: "user",
  // };

  const [getSession, { data }] = useLazyQuery(GET_SESSION_BY_ID, {
    onCompleted: (data) => {
      const tmp: any = data?.getSessionById;
      if (tmp) {
        setUserData(tmp?.user);
      }
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getSession();
  }, []);

  // If userData is not set, try to get it from the session query result
  const user = userData || data?.getSessionById?.user;

  if (!user) {
    return <Navigate to='/auth/login' />;
  } else {
    return <Component {...rest} />;
  }

  // if (user.role !== extraProps.role) {
  //   return (
  //     <Navigate
  //       to="/auth/login"
  //       state={`You must have ${roleNames[extraProps.role]} previlage to access this page`}
  //     />
  //   );
  // }
};

export default ProtectedRoute;
