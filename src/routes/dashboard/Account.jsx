import { AvailableTimes } from "../../components/AvailableTimes";
import { PersonalAccount } from "../../components/PersonalAccount";
import { Tabs } from "../../components/Tabs";

const Account = () => {
  const TABS = [
    { id: 1, name: "Available Times", component: <AvailableTimes /> },
    { id: 2, name: "Personal Details", component: <PersonalAccount /> },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Tabs data={TABS} />
    </div>
  );
};

export default Account;
