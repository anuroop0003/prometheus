import Layout from "@/components/layout";
import Analytics from "@/pages/analytics";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, Login } from "./lazy-pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);
