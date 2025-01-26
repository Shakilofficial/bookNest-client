import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import { routeGenerator } from "@/utils/routeGenerator";
import { createBrowserRouter } from "react-router-dom";
import { AdminPaths } from "./AdminRoutes";
import { authPaths } from "./AuthRoutes";
import { PublicPaths } from "./PublicRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: routeGenerator(PublicPaths),
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: routeGenerator(authPaths),
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routeGenerator(AdminPaths),
  },
]);

export default router;
