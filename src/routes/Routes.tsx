import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Orders from "@/pages/admin/Orders";
import Products from "@/pages/admin/Products";
import Settings from "@/pages/admin/Settings";
import Users from "@/pages/admin/Users";
import ErrorPage from "@/pages/ErrorPage";
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
    children: [
      {
        path: "users",
        element: (
          <ProtectedRoute role="admin">
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
