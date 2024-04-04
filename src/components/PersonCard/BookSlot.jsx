import { useEffect, useState } from "react";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../Button/IconButton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import { getDataLabelFromKey } from "../../utils/data";
import { useSelector } from "react-redux";

export const BookSlot = ({
  data,
  selected,
  setSelected = () => {},
  handleClose = () => {},
  handleBook = () => {},
}) => {
  const allSkill = useSelector((state) => state.profession.allSkill);

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
    <div className="px-8 py-8">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium text-gray-400">
          Book Interview Slot
        </div>
        <IconButton onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} className="text-gray-700 text-lg" />
        </IconButton>
      </div>
      <div className="py-4">
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
                              ? "bg-green-100 border-green-200"
                              : hour.state === "BOOKED"
                              ? "bg-gray-300 text-gray-300"
                              : "cursor-pointer bg-transparent border-green-200"
                          } border border-slate-200 text-text 
                          text-sm font-normal rounded-lg px-4 py-2`}
                          onClick={() => setSelected(hour)}
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
      <div>
        <div className="py-2">
          <div className="text-sm text-gray-500 pb-1">
            Practice Areas for this slot
          </div>
          <div className="flex gap-1">
            {selected.practiceAreas && selected.practiceAreas.length ? (
              selected.practiceAreas.map((focus, i) => {
                return (
                  <div key={focus}>
                    <span className="bg-gray-200 text-gray-600 px-4 py-0 rounded-full">
                      {getDataLabelFromKey(allSkill, focus)}
                    </span>
                  </div>
                );
              })
            ) : (
              <div />
            )}
          </div>
        </div>
        {selected.interviewNote ? (
          <div className="py-2">
            <div className="text-sm text-gray-500 pb-1">
              Interview Note for this slot
            </div>
            <div className="text-base text-text font-medium pb-1">
              {selected.interviewNote}
            </div>
          </div>
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
