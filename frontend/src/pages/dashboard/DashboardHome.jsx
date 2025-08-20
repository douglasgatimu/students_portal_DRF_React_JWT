import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import { UserAuth } from "../../context/DRFAuthContext";
import DashboardOverview from "./DashboardOverview";

const DashboardHome = () => {
  const { isAuthenticated } = UserAuth();

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-6">
        <DashboardOverview />
      </div>
    </div>
  );
};

export default DashboardHome;
