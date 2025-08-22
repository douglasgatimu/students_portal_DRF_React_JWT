import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-4">{course.short_description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Instructor_ID: TM00{course.owner}</span>
        <span>{course.module}</span>
      </div>
      <div className="mt-4">
        <span className="text-blue-600 font-medium">
          {course.studentsEnrolled} students
        </span>
      </div>

      <div className="flex flex-col mt-8 transition-all duration-300 ease-in-out">
        <Link
          
          style={{ backgroundColor: "#640146" }}
          className="hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded text-center"
          to={`/dashboard/courses/${course.slug}`}
        >
          View Details
        </Link>
      </div>      
    </div>
  );
};

export default CourseCard;
