import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertISOUTCDayTimeToLocalDayTime } from "../../../utils/timeDate";
import { IconButton } from "../../Button/IconButton";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "../../Modal";
import { CreateMeeting } from "./CreateMeeting";
import { useSelector } from "react-redux";

export const DisplayAvailability = () => {
  const profile = useSelector((state) => state.user.visitingProfile);
  const [selectedAvailability, setSelectedAvailability] = useState(false);

  const handleCancel = () => {
    setSelectedAvailability();
  };

  return (
    <div className="bg-white h-full w-full p-4">
      <div className="text-center font-semibold text-lg">Availabilities</div>
      <div className="py-2">
        {profile.availabilities ? (
          <>
            {profile.availabilities.length ? (
              <>
                {profile.availabilities.map((avl) => {
                  return (
                    <div
                      key={avl.id}
                      className="flex items-center justify-between py-1"
                    >
                      <div className="text-sm font-normal text-gray-500">
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
                        className={`px-5 py-1 font-semibold text-xs ${
                          avl.state === "COMPLETED"
                            ? "text-red-400"
                            : avl.state === "BOOKED"
                            ? "text-blue-400"
                            : "text-green-500"
                        }`}
                      >
                        {avl.state}
                      </div>
                      {avl.state === "OPEN" ? (
                        <IconButton
                          onClick={() => setSelectedAvailability(avl)}
                        >
                          <FontAwesomeIcon
                            icon={faCalendarPlus}
                            className="text-secondary"
                          />
                        </IconButton>
                      ) : (
                        <div />
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div>No Data</div>
            )}
          </>
        ) : (
          <div>No Data</div>
        )}
      </div>
      {selectedAvailability && (
        <Modal>
          <CreateMeeting
            profile={profile}
            data={selectedAvailability}
            handleCancel={handleCancel}
          />
        </Modal>
      )}
    </div>
  );
};
