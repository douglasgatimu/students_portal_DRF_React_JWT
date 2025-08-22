import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Module: {course.module}</span>
      </div>      
      <p className="text-gray-600 mb-4">{course.short_description}</p>

      <div className="flex justify-between text-sm text-gray-500">
        <span>Instructor: {course.owner}</span>
      
      </div>
      <div className="mt-4">
        <span className=" font-medium">
          <span className="font-semibold"> {course.student_count}</span> already enrolled
        </span>
      </div>

      {!course.is_enrolled? (
        <div className="flex flex-col mt-8 transition-all duration-300 ease-in-out">
        <Link
          
          style={{ backgroundColor: "#640146" }}
          className="hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded text-center"
          to={`/dashboard/courses/${course.slug}`}
        >
          View Details
        </Link>
      </div>
      ) : (
        <div className="flex flex-col mt-8 transition-all duration-300 ease-in-out">
        <Link
          
          style={{ backgroundColor: "#640146" }}
          className="hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded text-center"
          to={`/dashboard/lessons`}
        >
          Resume
        </Link>
      </div>        
      )
}    
    </div>
  );
};

export default CourseCard;
