import React, { useState } from "react";
import { Chatbox } from "./Chatbox";
import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { Inbox } from "./Inbox";
import { Sentbox } from "./Sentbox";

export const MessageComponent = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const TABS = [
    {
      id: 1,
      name: "Inbox",
      component: <Inbox setUserForChat={setSelectedUser} />,
    },
    {
      id: 2,
      name: "Sent",
      component: <Sentbox setUserForChat={setSelectedUser} />,
    },
  ];

  const closeChat = () => setSelectedUser(null);

  return (
    <div className="main-page flex flex-col h-screen">
      <HorizontalTabs data={TABS} />
      {selectedUser && (
        <div className="chatbox-container fixed bottom-0 left-5 w-96 h-1/2">
          <Chatbox otherUserId={selectedUser} closeChat={closeChat} />
        </div>
      )}
    </div>
  );
};
