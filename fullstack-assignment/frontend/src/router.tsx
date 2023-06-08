import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Orders from "./pages/orders";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardWrapper from "./component/dashboard-wrapper";

const paths = createBrowserRouter([
  {
    path: "/",
    element: <DashboardWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
export default function Router() {
  return <RouterProvider router={paths} />;
}
