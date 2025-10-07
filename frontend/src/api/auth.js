import axios from "axios";
import { IS_AUTH_URL, LOGIN_URL, REGISTER_URL } from "./endpoints";
import { REFRESH_URL } from "./endpoints";
import { LOGOUT_URL } from "./endpoints";

export const login = async (username, password) => {
  const response = await axios.post(
    LOGIN_URL,

    { username: username, password: password },
    { withCredentials: true },
  );

    const data = response.data;
  if (!data.success) {
    throw new Error(data.errors || "Login failed");
  }
  
  return data;

};

export const refreshToken = async () => {
  try {
    await axios.post(REFRESH_URL, {}, { withCredentials: true });
    return true;
  } catch (error) {
    console.error("Token refresh failed:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return false;
  }
};

export const callRefresh = async (error, func) => {
  if (error.response && error.response.status === 401) {
    const tokenRefreshed = await refreshToken();

    if (tokenRefreshed) {
      const retryResponse = await func();
      return retryResponse.data;
    } else {
      console.error("Token refresh failed. User re-authenticate.");
      throw new Error(
        "Authentication failed: refresh token invalid or expired",
      );
    }
  }

  throw error;
};

export const logout = async () => {
  try {
    await axios.post(LOGOUT_URL, {}, { withCredentials: true });
    return true;
  } catch (error) {
    return false;
  }
};

export const authenticationStatus = async () => {
  const response = await axios.get(IS_AUTH_URL, {}, { withCredentials: true });

  return response;
};

export const register = async (username, password, firstName, lastName) => {
  try {
    const response = await axios.post(
      REGISTER_URL,
      { username, password, firstName: firstName, lastName: lastName },
      { withCredentials: true,
        headers: { "Content-Type": "application/json" },
       },
      
    );
    console.log('reg_data: ', response.data)
    return response.data;

  } catch (err) {
    if (err.response && err.response.data) {
      throw {
        type: "validation",
        errors: err.response.data,
      };
    }

    throw {
      type: "network",
      message: "Network or server error. Please try again later.",
    };
  }
};
