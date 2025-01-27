import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import { routeGenerator } from "@/utils/routeGenerator";
import { createBrowserRouter } from "react-router-dom";
import { authPaths } from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoute";
import { PublicPaths } from "./PublicRoutes";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: routeGenerator(authPaths),
  },
  {
    path: "/",
    element: <MainLayout />,
    children: routeGenerator(PublicPaths),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
  },
]);

export default router;
