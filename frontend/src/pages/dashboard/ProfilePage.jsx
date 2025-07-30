import { UserAuth } from "../../context/AuthContext";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();

  const handleChangePasswordClick = () => {
    navigate("/reset-password");
  };

  const user = session?.user;
  const userMetadata = user?.user_metadata || {};

  const fullName =
    userMetadata.fullName ||
    (userMetadata.firstName && userMetadata.lastName
      ? `${userMetadata.firstName} ${userMetadata.lastName}`
      : "User");

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-[#640146]">Profile</h1>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-[#f3e0ed] flex items-center justify-center text-[#640146] text-2xl font-bold mr-4">
              {fullName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#640146]">{fullName}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-[#640146]">Personal Information</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Role:</span> Student
                </p>
                <p>
                  <span className="font-medium">Member Since:</span> {memberSince}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-[#640146]">Account Security</h3>
              <button
                onClick={handleChangePasswordClick}
                className="bg-[#640146] text-white px-4 py-2 rounded-md hover:bg-[#4d0035] transition"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
