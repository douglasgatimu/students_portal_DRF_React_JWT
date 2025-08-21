import { callRefresh } from "./auth";
import { COURSES_URL } from "./endpoints";
import axios from "axios";

export const getCourses = async () => {
  try {
    const response = await axios.get(COURSES_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return callRefresh(error, () =>
      axios.get(COURSES_URL, { withCredentials: true }),
    );
  }
};

export const getCourseBySlug = async (slug) => {
  try {
    const response = await axios.get(`${COURSES_URL}${slug}/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return callRefresh(error, () =>
      axios.get(`${COURSES_URL}${slug}/`, { withCredentials: true }),
    );
  }
};

export const enrollCourse = async (slug) => {
  try {
    const response = await axios.post(
      `${COURSES_URL}${slug}/enroll/`,
      {},
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    return callRefresh(error, () =>
      axios.post(
        `${COURSES_URL}${slug}/enroll/`,
        {},
        { withCredentials: true },
      ),
    );
  }
};
