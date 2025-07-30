import { Outlet, Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { session, loading } = UserAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
