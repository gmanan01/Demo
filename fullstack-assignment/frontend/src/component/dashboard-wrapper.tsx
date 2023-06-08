import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import OrderPopup from "./order-popup";

export default function DashboardWrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
