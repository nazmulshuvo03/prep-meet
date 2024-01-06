import { PersonalAccount } from "../../components/PersonalAccount";
import { Tabs } from "../../components/Tabs";

const Account = () => {
  const TABS = [
    { id: 1, name: "Personal Details", component: <PersonalAccount /> },
    { id: 2, name: "Available Times", component: <div>Second Tab</div> },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Tabs data={TABS} />
    </div>
  );
};

export default Account;
