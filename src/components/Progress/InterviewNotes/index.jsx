import { HorizontalTabs } from "../../Tabs/HorizontalTabs";
import { Notes } from "./Notes";
import { useEffect, useState } from "react";

export const InterviewNotes = ({ data }) => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    if (data && data.length) {
      const tabData = [];
      for (let item of data) {
        tabData.push({
          id: item.id,
          name: `${item.name} (${item.notes.length})`,
          component: <Notes data={item.notes} />,
        });
      }
      setTabs(tabData);
    }
  }, [data]);

  return (
    <div className="bg-white !h-full rounded-md">
      <HorizontalTabs data={tabs} />
    </div>
  );
};
