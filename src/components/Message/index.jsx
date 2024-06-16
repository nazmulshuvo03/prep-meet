import React from "react";
import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { Inbox } from "./Inbox";
import { Sentbox } from "./Sentbox";

export const MessageComponent = () => {
  const TABS = [
    {
      id: 1,
      name: "Inbox",
      component: <Inbox />,
    },
    {
      id: 2,
      name: "Sent",
      component: <Sentbox />,
    },
  ];

  return (
    <div className="main-page flex flex-col h-screen">
      <HorizontalTabs data={TABS} />
    </div>
  );
};
