import { Link } from "react-router-dom";
import { UserAuth } from "../../context/DRFAuthContext";

const DashboardOverview = () => {
  const { isAuthenticated, user } = UserAuth();

  
  const userMetadata = user || {};

  const firstName = userMetadata.firstName || "Student";

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 bg-[#e8ded4]">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-[#640146] mb-4">
          Welcome, {firstName}!
        </h1>
        <p className="text-lg text-[#640146] mb-10">
          "Success is not final, failure is not fatal: It is the courage to
          continue that counts." Winston Churchill
        </p>
        <div className="flex justify-center space-x-4 text-[#640146] font-medium">
          Happy Coding!
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
