import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Dashboard from "./pages/dashboard";
import Drivers from "./pages/drivers";
import Riders from "./pages/riders";
import Rides from "./pages/rides";
import Users from "./pages/users";
import Vehicles from "./pages/vehicles";
import Setting from "./pages/setting";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/drivers' element={<Drivers />} />
      <Route path='/riders' element={<Riders />} />
      <Route path='/rides' element={<Rides />} />
      <Route path='/users' element={<Users />} />
      <Route path='/vehicles' element={<Vehicles />} />
      <Route path='/setting' element={<Setting />} />
    </Routes>
  );
}

export default App;
