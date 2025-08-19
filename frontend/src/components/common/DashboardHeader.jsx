import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const DashboardHeader = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-[#640146] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Nawiri
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {!session ? (
              <>
                <li>
                  <Link to="/signin" className="hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:underline">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/courses" className="hover:underline">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/lessons" className="hover:underline">
                    Lessons
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/announcements"
                    className="hover:underline"
                  >
                    Announcements
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="hover:underline">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
