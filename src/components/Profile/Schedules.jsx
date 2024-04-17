import { useDispatch, useSelector } from "react-redux";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteAvailability } from "../../store/middlewares/availability";
import { getDataLabelFromKey } from "../../utils/data";
import { CapsulList } from "../Capsul/CapsulList";

export const Schedules = () => {
  const dispatch = useDispatch();
  const availabilities = useSelector(
    (state) => state.availability.userAvailabilities
  );
  const allSkill = useSelector((state) => state.profession.allSkill);

  const handleDelete = (values) => {
    dispatch(deleteAvailability(values));
  };

  return (
    <div className="bg-white p-3 h-fit w-full shadow-md">
      <div className="font-semibold text-center pt-2 pb-3">
        Current Schedule
      </div>
      <div>
        {availabilities && availabilities.length ? (
          <div>
            {availabilities.map((avl) => {
              return (
                <div key={avl.id} className="py-2">
                  <div className="grid grid-cols-12 items-center justify-between">
                    <div className="col-span-7 text-sm font-normal text-gray-500">
                      {
                        convertISOUTCDayTimeToLocalDayTime(avl.dayHourUTC)
                          .dateMonthView
                      }
                      {", "}
                      {convertISOUTCDayTimeToLocalDayTime(avl.dayHourUTC).time}
                    </div>
                    <div
                      className={`col-span-4 px-5 py-1 font-semibold text-xs ${
                        avl.state === "COMPLETED"
                          ? "text-red-400"
                          : avl.state === "BOOKED"
                          ? "text-green-400"
                          : "text-blue-500"
                      }`}
                    >
                      {avl.state}
                    </div>
                    <div className="col-span-1">
                      <Button
                        onClick={() => handleDelete(avl)}
                        className={"!bg-transparent !text-red-500 !p-0"}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>
                  <div className="py-1">
                    <CapsulList data={avl.practiceAreas} labels={allSkill} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-gray-600">None Available</div>
        )}
      </div>
    </div>
  );
};
