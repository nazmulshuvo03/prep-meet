import { useState } from "react";
import { Input } from "../Input";
import {
  convertLocalDayTimeToUTCDayTime,
  generateHourArray,
} from "../../utils/timeDate";
import { Dropdown } from "../Dropdown";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { createUserAvailability } from "../../store/middlewares/availability";

export const AddAvailability = ({ data }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const hourArray = generateHourArray();

  const handleSubmit = () => {
    const data = {
      userId: profile.id,
      dayHourUTC: convertLocalDayTimeToUTCDayTime(date, time),
    };
    dispatch(createUserAvailability(data));
  };

  return (
    <div className="bg-white p-3 h-full w-ful">
      <div className="font-semibold text-center pt-2 pb-3">
        Add Availability
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label={"Date"}
          type="date"
          value={date || ""}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          placeholder={"Add Date"}
        />
        <div>
          <Dropdown
            label={"Time"}
            name={"time"}
            value={time || ""}
            options={hourArray}
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
