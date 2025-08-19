import { callRefresh } from "./auth";
import { COURSES_URL } from "./endpoints";
import axios from "axios";

export const getCourses = async () => {
  try {
    const response = await axios.get(COURSES_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return callRefresh(
      error,
      axios.get(COURSES_URL, { withCredentials: true }),
    );
  }
};
