import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import ProfessionAdmin from "./Profession";

export const AdminPage = () => {
  const TABS = [
    { id: 1, name: "Users", component: <div>User Admin Panel</div> },
    { id: 2, name: "Profession", component: <ProfessionAdmin /> },
    { id: 3, name: "Companies", component: <div>Companies Admin Panel</div> },
  ];

  return <HorizontalTabs data={TABS} />;
};
