import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import { getCourseBySlug, enrollCourse } from "../../api/courses";
import { Link } from "react-router-dom";

const CoursePage = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseBySlug(slug)
        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      }
    };
    fetchCourse();
  }, [slug]);

  const handleEnroll = async (slug) => {
    try {
      const result = await enrollCourse(slug);

      alert(`${result.detail}: ${slug}`);
    } catch (error) {
      alert(`${error.message}`);
    }
  };  
  if (!course) {
    return (
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-6 ml-64 flex items-center justify-center text-purple-600">
          Loading course...
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-6 ml-64">

       
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          {course.title}
        <p className="text-lg text-gray-700 mb-6 mt-4 ml-2">{course.short_description}</p>
          
        </h1>
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-full bg-[#f3e0ed] flex items-center justify-center text-[#640146] text-xl font-bold mr-4">
              {course.owner.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xm font-semibold text-[#640146]">
                By {course.owner}
              </h2>
              
            </div>
          </div>

        

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 p-4 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{course.description}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              Outcome
            </h2>
            <p className="text-gray-700">{course.outcome}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              Requirements
            </h2>
            <p className="text-gray-700">{course.requirements}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              Details
            </h2>
            <ul className="text-gray-700 space-y-1">
              <li>
                <span className="font-medium">Language:</span> {course.language}
              </li>
              <li>
                <span className="font-medium">Level:</span> {course.level}
              </li>
              <li>
                <span className="font-medium">Updated:</span>{" "}
                {new Date(course.updated_at).toLocaleDateString()}
              </li>

            </ul>
          </div>
        </div>

        
<div className="bg-purple-600 text-white p-6 rounded-2xl shadow text-center">
  <h2 className="text-2xl font-bold mb-2">
    {course.is_enrolled ? "Welcome back!" : "Ready to start learning?"}
  </h2>

  <p className="mb-4">
    {course.is_enrolled ? (
      <>
        Continue your journey in{" "}
        <span className="font-semibold">{course.title}</span>.
      </>
    ) : (
      <>
        Join <span className="font-semibold">{course.title}</span> today and
        unlock your potential.
      </>
    )}
  </p>

  {course.is_enrolled ? (
    <Link
    to='/dashboard/lessons'
      className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-purple-100 transition"
    
    >
      Resume Course
    </Link>
  ) : (
    <button
      className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-purple-100 transition"
      onClick={() => handleEnroll(course.slug)}   
    >
      Enroll Now
    </button>
  )}
</div>

      </div>
    </div>
  );
};

export default CoursePage;
