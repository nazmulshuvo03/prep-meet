import React, { useState, useEffect, useRef } from "react";
import {
  fetchChatboxMessages,
  markMessagesAsRead,
  sendMessage,
} from "../../services/functions/message";
import { useDispatch, useSelector } from "react-redux";
import { Chat } from "./Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../Button/IconButton";
import { Button } from "../Button";
import { setChat } from "../../store/slices/global";

export const Chatbox = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const otherUser = useSelector((state) => state.global.chat);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchChatboxMessages(otherUser.id);
      if (data && data.length) {
        setMessages(data);
        scrollToBottom();
        await markMessagesAsRead({ otherUserId: otherUser.id });
      }
    };

    if (otherUser && otherUser.id) {
      setMessages([]);
      loadMessages();
    }
  }, [otherUser]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: profile.id,
      receiverId: otherUser.id,
      subject: "",
      body: newMessage,
    };

    try {
      const sentMessage = await sendMessage(messageData);
      setMessages([...messages, sentMessage]);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const closeChat = () => {
    dispatch(setChat());
  };

  return (
    <div className="chatbox fixed bottom-0 right-5 w-96 h-1/2 flex flex-col !bg-white rounded-t-md shadow-2xl z-50">
      <div className="chatbox-header flex justify-between items-center px-4 py-2 bg-primary rounded-t-md shadow-md">
        {otherUser && (
          <div className="flex items-center">
            <img
              src={otherUser.photoURL}
              alt={otherUser.userName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="text-lg font-semibold">{otherUser.userName}</div>
          </div>
        )}
        <IconButton className={"!text-text"} onClick={closeChat}>
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      </div>
      <div className="messages flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <Chat key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-box flex p-4 border-t border-gray-200">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
        />
        <Button
          onClick={handleSendMessage}
          className={"!bg-secondary !rounded-md"}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </div>
    </div>
  );
};
