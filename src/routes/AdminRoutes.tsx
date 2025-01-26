import Dashboard from "@/pages/admin/Dashboard";
import Orders from "@/pages/admin/Orders";
import Products from "@/pages/admin/Products";
import Settings from "@/pages/admin/Settings";
import Users from "@/pages/admin/Users";
import {
  Cog,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users as UsersIcon,
} from "lucide-react";

export const AdminPaths = [
  {
    name: "dashboard",
    path: "/dashboard",
    element: <Dashboard />,
    icon: LayoutDashboard,
  },
  {
    name: "users",
    path: "/dashboard/users",
    element: <Users />,
    icon: UsersIcon,
  },
  {
    name: "products",
    path: "/dashboard/products",
    element: <Products />,
    icon: ShoppingBag,
  },
  {
    name: "orders",
    path: "/dashboard/orders",
    element: <Orders />,
    icon: ShoppingCart,
  },
  {
    name: "settings",
    path: "/dashboard/settings",
    element: <Settings />,
    icon: Cog,
  },
];
