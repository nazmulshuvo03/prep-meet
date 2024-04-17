import { useDispatch, useSelector } from "react-redux";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteAvailability } from "../../store/middlewares/availability";
import { getDataLabelFromKey } from "../../utils/data";
import { CapsulList } from "../Capsul/CapsulList";
import { ProfileBlock } from "../Layouts/ProfileBlock";

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
    <ProfileBlock title="Schedules" className="!bg-primary h-full">
      <div>
        {availabilities && availabilities.length ? (
          <div>
            {availabilities.map((avl) => {
              return (
                <div
                  key={avl.id}
                  className="py-2 px-2 bg-white my-2 rounded-md shadow-sm"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline justify-start">
                      <div className="text-base font-light text-gray-700">
                        {
                          convertISOUTCDayTimeToLocalDayTime(avl.dayHourUTC)
                            .dateMonthView
                        }
                        {", "}
                        {
                          convertISOUTCDayTimeToLocalDayTime(avl.dayHourUTC)
                            .time
                        }
                      </div>
                      <div
                        className={`px-1 py-1 font-normal text-xs ${
                          avl.state === "COMPLETED"
                            ? "text-red-400"
                            : avl.state === "BOOKED"
                            ? "text-green-400"
                            : "text-blue-500"
                        }`}
                      >
                        {avl.state}
                      </div>
                    </div>
                    <div className="">
                      <Button
                        onClick={() => handleDelete(avl)}
                        className={
                          "!bg-transparent !text-red-500 !text-sm !p-0"
                        }
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
    </ProfileBlock>
  );
};
