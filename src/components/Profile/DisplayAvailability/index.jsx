import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertISOUTCDayTimeToLocalDayTime } from "../../../utils/timeDate";
import { IconButton } from "../../Button/IconButton";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "../../Modal";
import { CreateMeeting } from "./CreateMeeting";
import { useSelector } from "react-redux";
import { isAllTrue } from "../../../utils/object";
import { getDataLabelFromKey } from "../../../utils/data";
import { CapsulList } from "../../Capsul/CapsulList";
import { ProfileBlock } from "../../Layouts/ProfileBlock";
import { NoData } from "../../NoData";

export const DisplayAvailability = () => {
  const profile = useSelector((state) => state.user.visitingProfile);
  const completionStatus = useSelector((state) => state.user.completionStatus);
  const allSkill = useSelector((state) => state.profession.allSkill);

  const [selectedAvailability, setSelectedAvailability] = useState(false);

  const handleCancel = () => {
    setSelectedAvailability();
  };

  return (
    <ProfileBlock title="Availabilities">
      <div className="py-2">
        {profile.availabilities && profile.availabilities.length ? (
          <>
            {profile.availabilities.map((avl) => {
              return (
                <div key={avl.id} className="py-1">
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
                          ? "text-blue-400"
                          : "text-green-500"
                      }`}
                    >
                      {avl.state}
                    </div>
                    <div className="col-span-1">
                      {isAllTrue(completionStatus) && (
                        <>
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
                        </>
                      )}
                    </div>
                  </div>
                  <div className="py-1">
                    <CapsulList data={avl.practiceAreas} labels={allSkill} />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <NoData message={"No Available Time Provided"} />
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
    </ProfileBlock>
  );
};
