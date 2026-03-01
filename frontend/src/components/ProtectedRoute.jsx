import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ requireAuth = true, redirectTo }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to={redirectTo ?? "/login"}
        replace
        state={{ from: location }}
      />
    );
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectTo ?? "/dashboard"} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
