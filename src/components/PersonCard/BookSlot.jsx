import { useEffect, useState } from "react";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../Button/IconButton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";

export const BookSlot = ({
  data,
  selected,
  handleClose = () => {},
  handleBook = () => {},
}) => {
  const [dates, setDates] = useState();

  const groupedByDate = data.availabilities.reduce((acc, obj) => {
    const date = new Date(obj.dayHourUTC).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(obj);
    return acc;
  }, {});

  useEffect(() => {
    if (data && data.availabilities) {
      const result = Object.values(groupedByDate);
      setDates(result);
    }
  }, [data]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium text-gray-400">
          Book Interview Slot
        </div>
        <IconButton onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} className="text-gray-700 text-lg" />
        </IconButton>
      </div>
      <div className="pl-8 py-4">
        {dates && dates.length ? (
          <>
            {dates.map((date, i) => {
              return (
                <div key={i} className="py-2">
                  <div className="text-text text-base font-semibold pb-2">
                    {
                      convertISOUTCDayTimeToLocalDayTime(date[0].dayHourUTC)
                        .dateMonthView
                    }
                    :
                  </div>
                  {date && date.length ? (
                    <div className="flex gap-2">
                      {date.map((hour) => (
                        <div
                          key={hour.id}
                          className={`${
                            hour.id === selected.id
                              ? "bg-green-100"
                              : // : hour.state === "BOOKED"
                                // ? "bg-gray-300"
                                "bg-slate-100"
                          } border border-slate-200 text-text 
                          text-sm font-medium rounded-lg px-4 py-2`}
                        >
                          {
                            convertISOUTCDayTimeToLocalDayTime(hour.dayHourUTC)
                              .time
                          }
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div />
        )}
      </div>
      <div className="text-center py-4">
        <Button size="small" className={"!bg-secondary"} onClick={handleBook}>
          Confirm Appoinment
        </Button>
      </div>
    </div>
  );
};
