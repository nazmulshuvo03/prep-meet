import { useState } from "react";
import {
  convertLocalDayTimeStringToUTCDayTime,
  generateHourArray,
} from "../../utils/timeDate";
import { Dropdown } from "../Dropdown";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { createUserAvailability } from "../../store/middlewares/availability";
import { DateInput } from "../Input/DateInput";

export const AddAvailability = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const isTodaySelected = () => {
    if (date) {
      return date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    } else return false;
  };

  const handleSubmit = () => {
    const data = {
      userId: profile.id,
      dayHourUTC: convertLocalDayTimeStringToUTCDayTime(date, time),
    };
    dispatch(createUserAvailability(data));
    setDate();
    setTime();
  };

  return (
    <div className="bg-white p-3 h-full w-ful">
      <div className="font-semibold text-center pt-2 pb-3">
        Add Availability
      </div>
      <div className="flex flex-col gap-2">
        <DateInput
          label={"Date"}
          minDate={new Date()}
          placeholder={"Select a day"}
          value={date || ""}
          onChange={(value) => {
            setDate(value);
          }}
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
        <div className="flex justify-end">
          <Button
            size="small"
            onClick={handleSubmit}
            className={"!bg-blue-500"}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
