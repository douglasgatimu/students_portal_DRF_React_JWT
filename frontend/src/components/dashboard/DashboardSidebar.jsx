import { Link, useLocation } from "react-router-dom";
import { UserAuth } from "../../context/DRFAuthContext";

const DashboardSidebar = () => {
  const location = useLocation();
  const { isAuthenticated, user } = UserAuth();

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-[#f5e5f0] text-[#640146]" // active bg + text
      : "text-gray-700";
  };

  if (!isAuthenticated) return null;

  return (
    <div className="w-64 bg-white shadow-md h-full fixed">
      <div className="p-4 border-b border-[#e4cce0]">
        <h2 className="text-xl font-semibold text-[#640146]">Dashboard</h2>
        <p className="text-sm text-gray-500">{user?.name}</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`block px-4 py-2 rounded-md hover:bg-[#f5e5f0] ${isActive("/dashboard")}`}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/courses"
              className={`block px-4 py-2 rounded-md hover:bg-[#f5e5f0] ${isActive("/dashboard/courses")}`}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/lessons"
              className={`block px-4 py-2 rounded-md hover:bg-[#f5e5f0] ${isActive("/dashboard/lessons")}`}
            >
              Lessons
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/profile"
              className={`block px-4 py-2 rounded-md hover:bg-[#f5e5f0] ${isActive("/dashboard/profile")}`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/announcements"
              className={`block px-4 py-2 rounded-md hover:bg-[#f5e5f0] ${isActive("/dashboard/announcements")}`}
            >
              Announcements
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
