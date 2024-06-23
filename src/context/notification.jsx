import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { config } from "../../.config";
import { fetchUserNotifications } from "../services/functions/notification";
import { useSelector } from "react-redux";

export const NotificationContext = createContext();

const socket = io(config.SERVER_URL);

export const NotificationProvider = ({ children }) => {
  const profile = useSelector((state) => state.user.profile);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (profile) {
      // Send user ID to server
      socket.emit("identify", profile.id);

      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      const getInitialNotifications = async () => {
        const data = await fetchUserNotifications(profile.id);
        if (data && data.length) {
          setNotifications(data);
        }
      };

      getInitialNotifications();

      socket.on("notification", (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });
    }

    return () => {
      socket.off("notification");
    };
  }, [profile]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
