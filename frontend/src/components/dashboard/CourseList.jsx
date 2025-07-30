import { useState, useEffect } from "react";
import { getCourses } from "../../api/courses";

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

  if (loading) {
    return <div className="text-center py-4">Loading courses...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Instructor: {course.instructor}</span>
            <span>{course.duration}</span>
          </div>
          <div className="mt-4">
            <span className="text-blue-600 font-medium">
              {course.studentsEnrolled} students
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
