import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";

export const MeetingSuccess = ({ data }) => {
  const allSkill = useSelector((state) => state.profession.allSkill);

  return (
    <div className="py-8 px-20">
      <div className="text-center text-green-500 font-light text-3xl">
        Interview Scheduled Successfully
      </div>
      <div className="pb-10 text-center text-text text-sm font-normal">
        A link for the interview has been sent to your registered email!
      </div>
      <div className="flex gap-10 pb-10">
        <div className="flex-0.5 flex justify-center items-center">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-500 h-24"
          />
        </div>
        <div className="flex-1 text-base leading-8 font-normal text-gray-600">
          <div>Username: {data.initiatorProfile.userName}</div>
          <div>
            Date:{" "}
            {convertISOUTCDayTimeToLocalDayTime(data.dayHourUTC).dateYearView}
          </div>
          <div>
            Time: {convertISOUTCDayTimeToLocalDayTime(data.dayHourUTC).time}
          </div>
          <div className="flex gap-1 flex-wrap items-center">
            Practice Areas:
            {data.practiceAreas && data.practiceAreas.length ? (
              data.practiceAreas.map((val, i) => {
                const label = getDataLabelFromKey(allSkill, val);
                const nextLabel = getDataLabelFromKey(
                  allSkill,
                  data.practiceAreas[i + 1]
                );
                return (
                  <div
                    key={val}
                    className={`font-normal flex gap-1 items-baseline`}
                  >
                    {label ? label : <span className="-ml-2" />}
                    {nextLabel ? (
                      <div
                        style={{
                          fontSize: 15,
                        }}
                      >
                        &middot;
                      </div>
                    ) : (
                      <span />
                    )}
                  </div>
                );
              })
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
