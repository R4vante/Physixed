import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound404 from "../pages/NotFound404";
import KinematicsRouter from "../../modules/px_kinematics/routers/KinematicsRouter";

const RootRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kinematics/*" element={<KinematicsRouter />} />

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouters;
