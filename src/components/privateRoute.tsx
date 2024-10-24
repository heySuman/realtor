import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Spinner } from "./spinner";

export default function PrivateRoute() {
  const { isLoggedIn, pending } = useAuthStatus();
  if (pending) return <Spinner />;
  return isLoggedIn ? <Outlet /> : <Navigate to={"/signin"} replace />;
}
