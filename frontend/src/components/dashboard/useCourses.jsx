import { useState, useEffect, useDebugValue } from "react";
import { getCourses, enrollCourse } from "../../api/courses";
export default function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useDebugValue(
    courses? `${courses[0]}` : "loading....."
  )

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (slug) => {
    try {
      const result = await enrollCourse(slug);

      alert(`${result.detail}: ${slug}`);
    } catch (error) {
      alert(`${error.message}`);
    }
  };   

  return { courses , handleEnroll, loading }
}