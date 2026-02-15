import Layout from "@/components/layout";
import Analytics from "@/pages/analytics";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, Login, Notifications } from "./lazy-pages";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
]);
