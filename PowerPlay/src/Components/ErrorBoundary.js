import { Navigate, Outlet } from "react-router";
import { useAppContext } from "../Context";

export function ProtectedRoute() {
  const { userName } = useAppContext();
  return userName ? <Outlet /> : <Navigate to="/" replace />;
}

export function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
    </div>
  );
}
