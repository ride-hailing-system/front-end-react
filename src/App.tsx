import "./App.css";
import ConfirmModal from "./components/modal";
import Routes from "./routes";
import { useContext } from "react";
import { Spin } from "antd";
import { LoadingContext } from "./context/loadingContext";

const App = () => {
  const { loadingData } = useContext(LoadingContext);

  return (
    <>
      <Spin spinning={loadingData?.isLoading}>
        <ConfirmModal />
        <Routes />;
      </Spin>
    </>
  );
};

export default App;
