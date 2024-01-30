import { useState } from "react";

export const Tabs = ({
  data = [{ id: 1, name: "First Tab", component: <div>Empty Content</div> }],
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="flex h-full w-full">
      <div className="py-10">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => setCurrentTab(item.id - 1)}
              className={`${
                currentTab === item.id - 1
                  ? "bg-accent text-white"
                  : "bg-background text-text"
              } w-36 h-10 flex justify-center items-center cursor-pointer rounded-l-md`}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="flex-1 h-full border border-accent rounded-md p-2">
        {data[currentTab].component}
      </div>
    </div>
  );
};
