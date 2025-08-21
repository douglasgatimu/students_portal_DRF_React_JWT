import { useState, useEffect } from "react";
import { getCourses, enrollCourse } from "../../api/courses";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center py-4">Loading courses...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} onEnroll={handleEnroll} />
      ))}
    </div>
  );
};

export default CourseList;
