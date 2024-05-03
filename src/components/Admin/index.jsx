import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { CompaniesAdmin } from "./Companies";
import { ProfessionAdmin } from "./Profession";

export const AdminPage = () => {
  const TABS = [
    { id: 1, name: "Companies", component: <CompaniesAdmin /> },
    { id: 2, name: "Profession", component: <ProfessionAdmin /> },
    { id: 3, name: "Users", component: <div>User Admin Panel</div> },
  ];

  return <HorizontalTabs data={TABS} />;
};
