import AllBooks from "@/pages/AllBooks";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";

export const PublicPaths = [
  {
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    name: "allBooks",
    path: "/all-books",
    element: <AllBooks />,
  },
  {
    name: "contact",
    path: "/contact",
    element: <Contact />,
  },
];
