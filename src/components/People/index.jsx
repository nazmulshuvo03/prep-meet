import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { AllPeople } from "./AllPeople";
import { FavouritePeople } from "./FavouritePeople";

export const People = () => {
  const TABS = [
    {
      id: 1,
      name: "All",
      component: <AllPeople />,
    },
    {
      id: 2,
      name: "Favourites",
      component: <FavouritePeople />,
    },
  ];

  return (
    <div className="p-6">
      <div className="text-4xl font-bold">People</div>
      <div className="pt-6">
        <HorizontalTabs data={TABS} allowSearch />
      </div>
    </div>
  );
};
