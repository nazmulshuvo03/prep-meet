import { useSelector } from "react-redux";
import { Tabs } from "../components/Tabs";
import { Profile } from "../components/Profile";
import { People } from "../components/People";
import { Progress } from "../components/Progress";
import { Interviews } from "../components/Interviews";
import { AvailableTimes } from "../components/AvailableTimes";

const Dashboard = () => {
  const profile = useSelector((state) => state.user.profile);

  const TABS = [
    { id: 1, name: "Profile", component: <Profile /> },
    { id: 2, name: "Search and Schedule", component: <People /> },
    { id: 3, name: "My Progress", component: <Progress /> },
    { id: 4, name: "My Interviews", component: <Interviews /> },
    { id: 5, name: "My Availability", component: <AvailableTimes /> },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      {profile && <Tabs data={TABS} />}
    </div>
  );
};

export default Dashboard;
