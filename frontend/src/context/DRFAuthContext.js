import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticationStatus, login, register, logout } from "../api/auth";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)
  const navigator = useNavigate();

  const getAuthenticated = async () => {
    try {
      const userData = await authenticationStatus();
      setIsAuthenticated(true);
      setUser(userData)
    } catch {
      setIsAuthenticated(false);
      setUser(null)
    } finally {
      setLoading(false);
    }
  };

const loginUser = async (username, password) => {
  const success = await login(username, password)
  if (success) {
    await getAuthenticated()
    navigator('/dashboard')
  }
}

const logoutUser = async () => {
  const success = await logout()
  if (success) {
    setIsAuthenticated(false)
    setUser(null)
    
  }
}

const registerUser = async (username, password, firstName, lastName) => {
  try {
    const data = await register(username, password, firstName, lastName);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
};



  useEffect(() => {
    getAuthenticated();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, loginUser, registerUser, logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
