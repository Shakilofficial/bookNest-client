import AllProducts from "@/pages/AllProducts";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Order from "@/pages/user/Order";
import VerifyOrder from "@/pages/user/VerifyOrder";
import ProtectedRoute from "./ProtectedRoute";
import AboutUs from "@/pages/AboutUs";

export const PublicPaths = [
  {
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    name: "allproducts",
    path: "/all-products",
    element: <AllProducts />,
  },
  {
    name: "product",
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    name: "about-us",
    path: "/about-us",
    element: <AboutUs />,
  },
  
  {
    name: "contact",
    path: "/contact",
    element: <Contact />,
  },
  {
    name: "order",
    path: "/order",
    element: (
      <ProtectedRoute role="user">
        <Order />
      </ProtectedRoute>
    ),
  },
  {
    name: "order-verify",
    path: "/order/verify",
    element: (
      <ProtectedRoute role="user">
        <VerifyOrder />
      </ProtectedRoute>
    ),
  },
];
