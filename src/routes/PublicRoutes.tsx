import AllProducts from "@/pages/AllProducts";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";

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
    name: "contact",
    path: "/contact",
    element: <Contact />,
  },
];
