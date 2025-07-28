import { Spin } from "antd";
import { useLazyQuery } from "@apollo/client";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { LOGOUT } from "../../graphql/queries/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const [logout, { loading }] = useLazyQuery(LOGOUT, {
    onCompleted: () => {
      toast.success("Logout successful!.");
      setTimeout(() => {
        setUserData({});
        navigate("/auth/login");
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    },
  });

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Spin spinning={loading} size='large'></Spin>
      <h1 className='font-semibold text-gray-900'>Logging out ...</h1>
    </div>
  );
};

export default Logout;
