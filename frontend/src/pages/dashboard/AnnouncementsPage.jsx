import AnnouncementsList from "../../components/dashboard/AnnouncementsList";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";

const AnnouncementsPage = () => {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-[#640146]">
          Announcements
        </h1>
        <AnnouncementsList />
      </div>
    </div>
  );
};

export default AnnouncementsPage;
