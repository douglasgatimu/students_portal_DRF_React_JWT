import { Outlet, Navigate } from "react-router-dom";
import { UserAuth } from "../context/DRFAuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = UserAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-lg font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
