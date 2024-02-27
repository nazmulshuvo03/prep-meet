import { useSelector } from "react-redux";
import { AvailableTimes } from "../components/AvailableTimes";
import { PersonalAccount } from "../components/PersonalAccount";
import { Tabs } from "../components/Tabs";

const Account = () => {
  const profile = useSelector((state) => state.user.profile);

  const TABS = [
    { id: 1, name: "Personal Details", component: <PersonalAccount /> },
    { id: 2, name: "Available Times", component: <AvailableTimes /> },
    { id: 3, name: "My Meetings", component: <div /> },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      {profile && <Tabs data={TABS} />}
    </div>
  );
};

export default Account;
