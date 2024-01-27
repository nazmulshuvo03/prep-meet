import { AvailableTimes } from "../../components/AvailableTimes";
import { MeetingRequests } from "../../components/MeetingRequests";
import { PendingRequests } from "../../components/PendingRequests";
import { PersonalAccount } from "../../components/PersonalAccount";
import { Tabs } from "../../components/Tabs";

const Account = () => {
  const TABS = [
    { id: 1, name: "Available Times", component: <AvailableTimes /> },
    { id: 2, name: "Meeting Requests", component: <MeetingRequests /> },
    { id: 3, name: "Your Requests", component: <PendingRequests /> },
    { id: 4, name: "Personal Details", component: <PersonalAccount /> },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Tabs data={TABS} />
    </div>
  );
};

export default Account;
