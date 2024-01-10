import { useEffect, useState } from "react";
import {
  generateDateArray,
  generateHourArray,
  getDateTimeStamp,
} from "../../utils/TimeDate";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrUpdateUserAvailability,
  fetchUserAvailabilities,
} from "../../redux/availability/function";

export const AvailableTimes = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const userAvailabilities = useSelector(
    (state) => state.availability.userAvailabilities
  );

  const [state, setState] = useState([]); // state is an array of following object
  /**
   * {
   *    day: {key: , label: },
   *    hours: [],
   * }
   */

  const dateArray = generateDateArray();
  const hourArray = generateHourArray();

  const handleTimeSelect = (item, time) => {
    setState((previous) => {
      const foundIndex = previous.findIndex(
        (prev) => prev.day.key === item.day.key
      );
      // the day in which time is selected
      if (foundIndex !== -1) {
        const found = { ...previous[foundIndex] }; // that day data
        const index = found.hours.indexOf(time.key); // check if the selected time exists in that day
        found.hours =
          index > -1
            ? found.hours.filter((key) => key !== time.key) // if that time exists on that day, remove it
            : [...found.hours, time.key]; // otherwise add it

        const newState = [...previous];
        newState[foundIndex] = found;
        return newState;
      }
      return previous;
    });
  };

  const handleSave = async () => {
    for (let item of state) {
      const data = {
        userId: profile.id,
        uuid: profile.uid,
        day: item.day.key,
        hours: item.hours,
      };
      await dispatch(createOrUpdateUserAvailability(data));
    }
  };

  useEffect(() => {
    dispatch(fetchUserAvailabilities(profile.id));
  }, [profile]);

  useEffect(() => {
    let states = [];
    states = dateArray.map((date) => [...states, { day: date, hours: [] }][0]);
    if (userAvailabilities) {
      for (let data of userAvailabilities) {
        const foundState = states.find((state) => state.day.key === data.day);
        if (foundState) {
          foundState.hours = data.hours;
        }
      }
    }
    setState(states);
  }, [userAvailabilities]);

  return (
    <div className="p-2">
      <div className="text-center text-3xl font-semibold text-accent pb-3">
        Select the times you are available for next 3 days
      </div>
      <div>
        {state && state.length ? (
          state.map((item, i) => {
            return (
              <div key={i} className="mb-3">
                <div className="py-2 text-text font-semibold text-xl">
                  {item.day.label}
                </div>
                <div className="flex gap-2 flex-wrap border border-primary rounded-md px-2 py-2 transform duration-300 ease-in-out">
                  {hourArray &&
                    hourArray.length &&
                    hourArray.map((hour) => (
                      <div
                        key={hour.key}
                        className={`cursor-pointer border border-primary rounded-md py-1 px-2 
                      ${
                        item.hours?.includes(hour.key)
                          ? "bg-primary text-white"
                          : "bg-background text-text"
                      }
                          `}
                        onClick={() => handleTimeSelect(item, hour)}
                      >
                        {hour.label}
                      </div>
                    ))}
                </div>
              </div>
            );
          })
        ) : (
          <div />
        )}
      </div>
      <div className="text-center">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};
