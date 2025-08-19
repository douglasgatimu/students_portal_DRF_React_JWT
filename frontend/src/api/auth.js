import axios from "axios";
import { IS_AUTH_URL, LOGIN_URL } from "./endpoints";
import { REFRESH_URL } from "./endpoints";
import { LOGOUT_URL } from "./endpoints";

export const login = async (username, password) => {
  const response = await axios.post(
    LOGIN_URL,

    { username: username, password: password },
    { withCredentials: true },
  );
  return response.data.success;
};

export const refreshToken = async () => {
  try {
    await axios.post(REFRESH_URL, { withCredentials: true });
    return true;
  } catch (error) {
    return false;
  }
};

export const callRefresh = async (error, func) => {
  if (error.response && error.response.status === 401) {
    const tokenRefreshed = await refreshToken();

    if (tokenRefreshed) {
      const retryResponse = await func();
      return retryResponse.data;
    }
  }
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
  try {
    await axios.post(IS_AUTH_URL, {}, { withCredentials: true });
    return true;
  } catch (error) {
    return false;
  }
};
