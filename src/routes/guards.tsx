import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => !!localStorage.getItem("access_token");

export const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
};
