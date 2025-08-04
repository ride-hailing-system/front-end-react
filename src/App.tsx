import "./App.css";
import ConfirmModal from "./components/modal";
import Routes from "./routes";
import { useContext } from "react";
import { Spin } from "antd";
import { LoadingContext } from "./context/loadingContext";
import { LoadScript } from "@react-google-maps/api";
import { MAP_API_KEY } from "./utils/globalVariables";

const App = () => {
  const { loadingData } = useContext(LoadingContext);

  return (
    <>
      <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={["places"]}>
        <Spin spinning={loadingData?.isLoading}>
          <ConfirmModal />
          <Routes />
        </Spin>
      </LoadScript>
    </>
  );
};

export default App;
