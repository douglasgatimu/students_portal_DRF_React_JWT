import { createContext, useContext, useEffect, useState } from "react";
import { login, register, logout } from "../api/auth";
import axios from "axios";
import { IS_AUTH_URL } from "../api/endpoints";
import { callRefresh } from "../api/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)
  

const getAuthenticated = async () => {
  try {
    const response = await axios.get(IS_AUTH_URL, { withCredentials: true });
    setUser(response.data);
    setIsAuthenticated(true);
  } catch (error) {
    
    const retried = await callRefresh(
      error,
      axios.get(IS_AUTH_URL, { withCredentials: true })
    );
    if (retried) {
      setUser(retried.data);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  } finally {
    setLoading(false);
  }
};


const loginUser = async (username, password) => {
  const success = await login(username, password)
  // console.log(success)
  if (success) {
    
    await getAuthenticated()
    
    
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
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, loginUser, registerUser, logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};


export const UserAuth = () => {
  return useContext(AuthContext);
};
