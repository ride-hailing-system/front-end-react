import "./App.css";
import ConfirmModal from "./components/Modals";
import Routes from "./routes";
import { LoadScript } from "@react-google-maps/api";
import { MAP_API_KEY } from "./utils/constants";

const App = () => {
  return (
    <>
      <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={["places"]}>
        <ConfirmModal />
        <Routes />
      </LoadScript>
    </>
  );
};

export default App;
