import { Outlet } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";

// Mengatur route yang akan ditampilkan di navbar
const routes = [
  {
    path: "/user",
    name: "Home",
  },
  {
    path: "/user/content",
    name: "My Videos",
  },
  {
    path: "/user/watch-laters",
    name: "Watch Laters",
  },
];

const UserLayout = ({ children }) => {
  return (
    <div className="mt-4 pt-5">
      <TopNavbar routes={routes} />
      {children ? children : <Outlet />}
    </div>
  );
};

export default UserLayout;
