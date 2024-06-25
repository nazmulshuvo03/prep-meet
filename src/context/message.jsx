import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { config } from "../../.config";
import { fetchUserNotifications } from "../services/functions/notification";
import { useSelector } from "react-redux";
import {
  fetchAllMessages,
  fetchInboxMessages,
} from "../services/functions/message";

export const MessageContext = createContext();

const socket = io(config.SERVER_URL);

export const MessageProvider = ({ children }) => {
  const profile = useSelector((state) => state.user.profile);
  const [messages, setMessages] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Send user ID to server
    socket.emit("identify", profile.id);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    const getInitialMessages = async () => {
      const allMessages = await fetchAllMessages();
      if (allMessages && allMessages.length) {
        setMessages(allMessages);
      }
      const data = await fetchInboxMessages();
      if (data && data.inboxMessages && data.inboxMessages.length) {
        setInboxMessages(data.inboxMessages);
        setUnreadCount(data.unreadCount);
      }
    };

    if (profile) getInitialMessages();

    socket.on("message", (message) => {
      setMessages((prev) => updateMessages(prev, message));
      setInboxMessages((prev) => updateMessages(prev, message));
      setUnreadCount((prev) => prev + 1);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("message");
    };
  }, [profile]);

  const updateMessages = (prevMessages, message) => {
    const existingMessageIndex = prevMessages.findIndex(
      (msg) =>
        msg.senderId === message.senderId &&
        msg.receiverId === message.receiverId
    );

    if (existingMessageIndex !== -1) {
      // Replace the old message
      const updatedMessages = [...prevMessages];
      updatedMessages[existingMessageIndex] = message;
      return updatedMessages;
    } else {
      // Add the new message
      return [message, ...prevMessages];
    }
  };

  const handleMessageReadContext = (id) => {
    setInboxMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, isRead: true } : message
      )
    );
    setUnreadCount((prev) => prev - 1);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        inboxMessages,
        setInboxMessages,
        unreadCount,
        setUnreadCount,
        handleMessageReadContext,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
