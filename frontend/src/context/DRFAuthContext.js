import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { authenticationStatus } from "../api/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const get_autenticated = async () => {
    try {
      const success = await authenticationStatus();
      setIsAuthenticated(success);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
