import Layout from "@/components/layout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./guards";
import { Home, Login, Notifications, Persona } from "./lazy-pages";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
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
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "persona",
            element: <Persona />,
          },
        ],
      },
    ],
  },
]);
