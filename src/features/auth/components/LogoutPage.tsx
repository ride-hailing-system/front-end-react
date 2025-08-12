import { Spin } from "antd";
import { LOGOUT } from "../../../graphql/queries/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../store/context/userContext";
import { useGraphQL } from "../../../hooks/useGraphQL";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const { query } = useGraphQL();

  const { runQuery: logout, loading } = query({
    queryStr: LOGOUT,
    onSuccess: () => {
      toast.success("Logout successful!.");
      setTimeout(() => {
        setUserData({});
        navigate("/auth/login");
      }, 1000);
    },
    onError: () => {
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

export default LogoutPage;
