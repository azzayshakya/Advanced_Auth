import HomeTopBar from "./HomeTopBar";
import { Outlet } from "react-router-dom";

const HomeUILayout = () => {
  return (
    <div className="">
      <HomeTopBar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeUILayout;
