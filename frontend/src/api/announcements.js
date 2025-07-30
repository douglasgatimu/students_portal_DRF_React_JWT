import { supabase } from "../services/supabaseClient";

export const getAnnouncements = async () => {
  const { data, error } = await supabase.from("announcements").select("*");

  if (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }

  return data;
};
