import React, { useState } from "react";
import { Chatbox } from "./Chatbox";
import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { Inbox } from "./Inbox";
import { Sentbox } from "./Sentbox";
import { useSelector } from "react-redux";

export const MessageComponent = () => {
  const profile = useSelector((state) => state.user.profile);
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

  return (
    <div className="main-page flex flex-col h-screen">
      <HorizontalTabs data={TABS} />
      {selectedUser && (
        <div className="chatbox-container fixed bottom-0 left-0 w-1/3 h-1/3 bg-white border border-gray-300 shadow-lg">
          <Chatbox userId={profile.id} otherUserId={selectedUser} />
        </div>
      )}
    </div>
  );
};
