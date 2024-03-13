import { useHistory } from "react-router-dom";
import { Button } from "../Button";
import {
  convertISOUTCDayTimeToLocalDayTime,
  getDateDescription,
} from "../../utils/timeDate";
import { useEffect, useState } from "react";

export const ActionArea = ({
  data = null,
  onNextAvailableClick = () => {},
}) => {
  const history = useHistory();
  const [latest, setLatest] = useState();

  useEffect(() => {
    if (data && data.availabilities && data.availabilities.length) {
      let sorted = data.availabilities
        .filter((item) => item.state === "OPEN")
        .sort((a, b) => a.dayHour - b.dayHour);
      if (sorted && sorted.length) {
        setLatest(sorted[0]);
      }
    }
  }, [data]);

  const handleClick = () => {
    history.push(`/user/${data.id}`);
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <Button className="bg-transparent !text-green-600 text-xs !font-semibold uppercase !py-1 !px-0">
        Last Practiced X days age
      </Button>
      <Button
        onClick={handleClick}
        className="bg-white !text-gray-700 !font-bold border border-gray-700 text-xs !py-1 !px-2"
      >
        Learn More
      </Button>
      {latest ? (
        <Button
          onClick={() => onNextAvailableClick(latest)}
          className="!bg-secondary border border-secondary text-xs !w-1/3 !py-1"
        >
          Next Available {getDateDescription(latest.dayHour)}{" "}
          {convertISOUTCDayTimeToLocalDayTime(latest.dayHourUTC).time}
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};
