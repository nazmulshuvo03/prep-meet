import { useEffect, useState } from "react";
import { generateHourArray } from "../../utils/timeDate";
import { useDispatch, useSelector } from "react-redux";
import {
  createRecurrentAvailability,
  fetchRecurrentAvailabilities,
} from "../../store/middlewares/availability";
import { Dropdown } from "../Dropdown";
import { Button } from "../Button";
import { getDataLabelFromKey } from "../../utils/data";
import { MultiInputDropdown } from "../Dropdown/MultiInputDropdown";
import { TextInput } from "../TextInput";

const dayIndexes = [
  { name: "Sunday", id: 0 },
  { name: "Monday", id: 1 },
  { name: "Tuesday", id: 2 },
  { name: "Wednesday", id: 3 },
  { name: "Thursday", id: 4 },
  { name: "Friday", id: 5 },
  { name: "Saturday", id: 6 },
];

const hourIndexes = generateHourArray();

export const AvailabilityPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const recurrentAvailabilities = useSelector(
    (state) => state.availability.recurrentAvailabilities
  );
  const professions = useSelector(
    (state) => state.profession.targetProfession.skills
  );

  const [selectedDay, setSelectedDay] = useState(0);
  const [time, setTime] = useState();
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState();
  const [interviewNote, setInterviewNote] = useState("");

  const handleAdd = () => {
    const data = {
      weekday: selectedDay,
      hour: time - 1,
      practiceAreas: selectedPracticeAreas,
      interviewNote: interviewNote,
    };
    dispatch(createRecurrentAvailability(data));
    setTime();
    setInterviewNote("");
  };

  const handlePracticeAreaSelection = (e) => {
    setSelectedPracticeAreas(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchRecurrentAvailabilities());
  }, []);

  useEffect(() => {
    if (profile) setSelectedPracticeAreas(profile.focusAreas);
  }, [profile]);

  console.log("@@@@@@@@@@@@@@", selectedDay, time);

  return (
    <div className="p-2 md:p-6 h-full">
      <div>
        {recurrentAvailabilities && recurrentAvailabilities.length ? (
          <>
            {recurrentAvailabilities.map((avl) => {
              return (
                <div key={avl.id}>
                  <div>
                    <span>{getDataLabelFromKey(dayIndexes, avl.weekday)}</span>
                    <span>
                      {getDataLabelFromKey(hourIndexes, avl.hour + 1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div />
        )}
      </div>
      <div className="">
        <div>
          {dayIndexes.map((day) => (
            <div
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`${selectedDay === day.id ? "text-green-500" : ""}`}
            >
              {day.name}
            </div>
          ))}
        </div>
        <Dropdown
          label="Time"
          name="time"
          value={time || ""}
          options={hourIndexes}
          onSelect={(e) => setTime(e.target.value)}
          defaultText="Time"
          allowSearch={false}
        />
        <MultiInputDropdown
          label="Practice Areas*"
          name="practiceAreas"
          value={selectedPracticeAreas}
          options={professions}
          onSelect={handlePracticeAreaSelection}
          defaultText={"Select upto 5"}
          size="small"
        />
        <TextInput
          label="Interview Note"
          name={"interviewNote"}
          placeholder={"Write a small note about the interview"}
          rows="4"
          value={interviewNote}
          setValue={(e) => setInterviewNote(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
};
