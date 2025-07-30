import CourseList from "../../components/dashboard/CourseList";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";

const CoursesPage = () => {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-[#640146]">Courses</h1>
        <CourseList />
      </div>
    </div>
  );
};

export default CoursesPage;
