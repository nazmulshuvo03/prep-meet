import { useEffect, useState } from "react";
import {
  convertLocalDayTimeStringToUTCDayTime,
  generateHourArray,
} from "../../utils/timeDate";
import { Dropdown } from "../Dropdown";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { createUserAvailability } from "../../store/middlewares/availability";
import { DateInput } from "../Input/DateInput";
import { MandatoryStar } from "../MandatoryStar";

export const AddAvailability = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const completionStatus = useSelector((state) => state.user.completionStatus);

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const isTodaySelected = () => {
    if (date) {
      return date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    } else return false;
  };

  const maxSelectabaleAvailability = () => {
    const currentDate = new Date();
    const sevenDaysLaterTimestamp =
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000;
    const sevenDaysLaterDate = new Date(sevenDaysLaterTimestamp);
    const formattedDate = sevenDaysLaterDate.toLocaleString();
    return formattedDate;
  };

  const handleSubmit = () => {
    if (!date) {
      setErrorMessage("Please provide date");
      return;
    }
    if (!time) {
      setErrorMessage("Please select time");
      return;
    }
    const data = {
      userId: profile.id,
      dayHourUTC: convertLocalDayTimeStringToUTCDayTime(date, time),
    };
    dispatch(createUserAvailability(data));
    setDate();
    setTime();
  };

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <div className="bg-white p-3 h-full w-full">
      <div className="font-semibold text-center pt-2 pb-3">
        Add Availability {!completionStatus.availabilities && <MandatoryStar />}
      </div>
      <div className="flex flex-col gap-2">
        <DateInput
          label={"Date"}
          minDate={new Date()}
          placeholder={"Select a date"}
          value={date || ""}
          onChange={(value) => {
            setDate(value);
          }}
          maxDate={maxSelectabaleAvailability()}
        />
        <div>
          <Dropdown
            label={"Time"}
            name={"time"}
            value={time || ""}
            options={generateHourArray({ untilNow: isTodaySelected() })}
            onSelect={(e) => {
              setTime(e.target.value);
            }}
            defaultText="Time"
            allowSearch={false}
          />
        </div>
        <div className="text-xs text-red-500 font-medium min-h-4 text-center">
          {errorMessage}
        </div>
        <div className="flex justify-end">
          <Button
            size="small"
            onClick={handleSubmit}
            className={"!bg-secondary"}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
