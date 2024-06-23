import { useContext } from "react";
import { NotificationContext } from "../../context/notification";

export const NotificationInbox = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications &&
          notifications.length &&
          notifications.map((notification) => (
            <li key={notification.id}>
              <strong>{notification.title || "Notification"}</strong>:{" "}
              {notification.message}
            </li>
          ))}
      </ul>
    </div>
  );
};
