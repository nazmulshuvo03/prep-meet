import { useHistory } from "react-router-dom";
import { Button } from "../Button";
import {
  convertISOUTCDayTimeToLocalDayTime,
  getDateDescription,
  timeDistance,
} from "../../utils/timeDate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isAllTrue } from "../../utils/object";
import { Tooltip } from "../Tooltip";

export const ActionArea = ({
  data = null,
  onNextAvailableClick = () => {},
}) => {
  const history = useHistory();
  const completionStatus = useSelector((state) => state.user.completionStatus);
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
      {data.lastMeeting ? (
        <div className="bg-transparent !text-green-600 text-xs !font-semibold uppercase !py-1 !px-0">
          Last Practiced{" "}
          {timeDistance(new Date().toISOString(), data.lastMeeting.dayHourUTC)}{" "}
          ago
        </div>
      ) : (
        <div />
      )}
      <Button
        onClick={handleClick}
        className="bg-white !text-gray-700 !font-bold border border-gray-700 text-xs !py-1 !px-2"
      >
        Learn More
      </Button>
      {latest ? (
        <Button
          onClick={
            isAllTrue(completionStatus)
              ? () => onNextAvailableClick(latest)
              : () => {}
          }
          className={`${
            isAllTrue(completionStatus)
              ? "!bg-secondary border-secondary"
              : "!bg-gray-300 border-gray-700 !text-gray-700 !cursor-default"
          } border text-xs !w-1/3 !py-1`}
        >
          <Tooltip text={"Complete your profile to start scheduling!"}>
            Next Available {getDateDescription(latest.dayHour)}{" "}
            {convertISOUTCDayTimeToLocalDayTime(latest.dayHourUTC).time}
          </Tooltip>
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};
