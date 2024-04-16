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
import { AdditionalInfo } from "../Profile/Reviews/AdditionalInfo";

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
    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
      <div>
        <AdditionalInfo reviews={data.reviews} />
      </div>
      <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-center pt-2 md:pt-0">
        {data.lastMeeting ? (
          <div className="bg-transparent !text-green-600 text-xs !font-semibold uppercase !p-0">
            Last Practiced {timeDistance(data.lastMeeting.dayHourUTC)} ago
          </div>
        ) : (
          <div />
        )}
        <div className="flex gap-1 md:gap-3">
          <Button
            onClick={handleClick}
            size="small"
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
              size="small"
              className={`${
                isAllTrue(completionStatus)
                  ? "!bg-secondary border-secondary"
                  : "!bg-gray-300 border-gray-700 !text-gray-700 !cursor-default"
              } border text-xs !md:w-fit !md:w-1/3 !py-1`}
            >
              <Tooltip
                text={
                  isAllTrue(completionStatus)
                    ? ""
                    : "Complete your profile to start scheduling!"
                }
              >
                Next Available {getDateDescription(latest.dayHour)}{" "}
                {convertISOUTCDayTimeToLocalDayTime(latest.dayHourUTC).time}
              </Tooltip>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
