import { useState } from "react";
import { Input } from "../Input";

export const HorizontalTabs = ({
  data = [{ id: 1, name: "First Tab", component: <div>Empty Content</div> }],
  allowSearch = false,
  searchValue = "",
  handleSearch = () => {},
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-background flex justify-between items-baseline border-b border-gray-700 py-1 px-2">
        <div className="flex gap-8">
          {data && data.length ? (
            data.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentTab(item.id - 1)}
                  className={`${
                    currentTab === item.id - 1 ? "underline" : "text-gray-400"
                  } flex justify-start items-center cursor-pointer text-sm font-semibold`}
                >
                  {item.name}
                </div>
              );
            })
          ) : (
            <div />
          )}
        </div>
        {allowSearch ? (
          <div>
            <Input
              placeholder="Search by Name"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="flex-1 h-full overflow-y-auto">
        {data[currentTab] ? data[currentTab].component : ""}
      </div>
    </div>
  );
};
