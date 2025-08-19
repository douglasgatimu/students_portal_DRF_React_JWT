import { useState, useEffect } from "react";
import { getAnnouncements } from "../../api/announcements";
import Announcement from "./Announcement";

const AnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsData = await getAnnouncements();
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading announcements...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {announcements.map((announcement) => (
        <Announcement key={announcement.id} {...announcement} />
      ))}
    </div>
  );
};

export default AnnouncementsList;
