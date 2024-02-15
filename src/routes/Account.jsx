import { useSelector } from "react-redux";
import { AvailableTimes } from "../components/AvailableTimes";
import { MyMeetings } from "../components/MyMeetings";
import { PersonalAccount } from "../components/PersonalAccount";
import { Tabs } from "../components/Tabs";

const Account = () => {
  const profile = useSelector((state) => state.user.profile);

  const TABS = [
    { id: 1, name: "Available Times", component: <AvailableTimes /> },
    { id: 2, name: "Personal Details", component: <PersonalAccount /> },
    { id: 3, name: "My Meetings", component: <MyMeetings /> },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full">
      {profile && <Tabs data={TABS} />}
    </div>
  );
};

export default Account;
