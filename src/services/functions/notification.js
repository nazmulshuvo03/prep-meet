import { fetchContent } from "../api";
import { user_notificaiton_url } from "../urls/notification";

export const fetchUserNotifications = async (userId) => {
  const res = await fetchContent(user_notificaiton_url(userId));
  console.log("Fetch notification response: ", res);
  if (res.success) {
    return res.data;
  } else return null;
};
