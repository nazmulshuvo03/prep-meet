import { useState } from "react";
import {
  generateDateArray,
  generateHourArray,
  getDateTimeStamp,
} from "../../utils/TimeDate";
import { Button } from "../Button";

export const AvailableTimes = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedHours, setSelectedHours] = useState([]);

  const dateArray = generateDateArray();
  const hourArray = generateHourArray();

  const handleDateSelect = (date) => {
    setSelectedDate((prev) => (prev === date.key ? null : date.key));
  };

  const handleTimeSelect = (time) => {
    setSelectedHours((prev) => [...prev, time.key]);
  };

  console.log(dateArray, selectedDate, selectedHours, getDateTimeStamp(14));

  return (
    <div className="p-2">
      <div className="">
        {dateArray &&
          dateArray.length &&
          dateArray.map((date) => (
            <div
              key={date.key}
              className={`cursor-pointer text-text pt-1 pb-4`}
              onClick={() => handleDateSelect(date)}
            >
              <div className="border-b border-gray-300 m-1">{date.label}</div>
              <div>
                {date.key === selectedDate ? (
                  <div className="flex gap-4 flex-wrap border border-primary rounded-md px-2 py-1 transform duration-300 ease-in-out">
                    {hourArray &&
                      hourArray.length &&
                      hourArray.map((hour) => (
                        <div
                          key={hour.key}
                          onClick={() => handleTimeSelect(hour)}
                        >
                          {hour.label}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="transform duration-300 ease-in-out" />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
