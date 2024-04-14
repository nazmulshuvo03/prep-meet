import { useSelector } from "react-redux";
import { HorizontalTabs } from "../../Tabs/HorizontalTabs";
import { Notes } from "./Notes";
import { useEffect, useState } from "react";

export const InterviewNotes = ({ data }) => {
  const notes = [
    {
      id: 1,
      name: "John Doe",
      image:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      currentCompany: "Amazom",
      dateOfInterview: "Feb 29 2024",
      stars: 4,
      matricsA: 3.5,
      matricsB: 4,
      matricsC: 5,
      comment:
        "Need to be more crisp when answering questions. Restructure why interested in company answer. Need to be more crisp when answering questions. Restructure why interested in company answer.",
    },
    {
      id: 2,
      name: "Clair Doe",
      image:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      currentCompany: "Amazom",
      dateOfInterview: "Feb 29 2024",
      matricsA: 3.5,
      matricsB: 4,
      matricsC: 5,
      comment:
        "Need to be more crisp when answering questions. Restructure why interested in company answer. Need to be more crisp when answering questions. Restructure why interested in company answer.",
    },
    {
      id: 3,
      name: "Ryan Doe",
      image:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      currentCompany: "Amazom",
      dateOfInterview: "Feb 29 2024",
      stars: 5,
      matricsA: 3.5,
      matricsB: 4,
      matricsC: 5,
      comment:
        "Need to be more crisp when answering questions. Restructure why interested in company answer. Need to be more crisp when answering questions. Restructure why interested in company answer.",
    },
  ];

  const TABS = [
    {
      id: 1,
      name: `Behavioral (${"x"})`,
      component: <Notes data={notes} />,
    },
    {
      id: 2,
      name: `Product Sense (${"x"})`,
      component: <Notes data={notes} />,
    },
    {
      id: 3,
      name: `Analytics and Metrics (${"x"})`,
      component: <Notes data={notes} />,
    },
  ];

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
    <div className="bg-white h-full rounded-sm p-4">
      <div className="text-xl font-medium text-text mb-3">Interview Notes</div>
      <HorizontalTabs data={tabs} />
    </div>
  );
};
