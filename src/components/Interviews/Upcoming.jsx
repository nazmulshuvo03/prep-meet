import { useSelector } from "react-redux";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";
import { getDataLabelFromKey } from "../../utils/data";
import useDeviceSize from "../../hooks/useDeviceSize";
import { IconButton } from "../Button/IconButton";

export const Upcoming = ({ data }) => {
  const deviceSize = useDeviceSize();
  const profile = useSelector((state) => state.user.profile);
  const companies = useSelector((state) => state.static.companies);
  const allSkill = useSelector((state) => state.profession.allSkill);

  return (
    <div className="rounded-md bg-white p-2 overflow-x-auto md:overflow-hidden">
      <div className="text-xl font-semibold py-2">Upcoming Interviews</div>
      <div
        className="shadow-md rounded-md"
        style={deviceSize === "sm" ? { width: "30rem" } : {}}
      >
        <div className="grid grid-cols-5 bg-gray-200 px-2 py-2 text-sm font-semibold rounded-t-md">
          <div>Date</div>
          <div>Type</div>
          <div>Name</div>
          <div>Company</div>
          <div>Actions</div>
        </div>
        {data && data.length ? (
          data.map((meeting, i) => {
            const meetingUser =
              profile.id === meeting.acceptor
                ? meeting.initiatorProfile
                : meeting.acceptorProfile;
            return (
              <div
                key={meeting.id}
                className={`grid grid-cols-4 items-center px-2 py-2 text-sm font-normal ${
                  i % 2 === 1 ? "bg-slate-50" : "bg-white"
                }`}
              >
                <div>
                  <div>
                    {
                      convertISOUTCDayTimeToLocalDayTime(meeting.dayHourUTC)
                        .dateMonthView
                    }
                  </div>
                  <div>
                    {
                      convertISOUTCDayTimeToLocalDayTime(meeting.dayHourUTC)
                        .time
                    }
                  </div>
                </div>
                <div className="flex gap-1">
                  {meeting.practiceAreas && meeting.practiceAreas.length ? (
                    meeting.practiceAreas.map((focus, i) => {
                      return (
                        <div key={focus}>
                          <span className="bg-gray-200 text-gray-600 px-4 py-0 rounded-full text-xs">
                            {getDataLabelFromKey(allSkill, focus)}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div />
                  )}
                </div>
                <div>{meetingUser.userName}</div>
                <div>
                  {meetingUser.workExperiences &&
                  meetingUser.workExperiences.length
                    ? getDataLabelFromKey(
                        companies,
                        meetingUser.workExperiences[0].companyId
                      )
                    : ""}
                </div>
                <div>
                  <IconButton
                    size="small"
                    className="!py-2 !text-xs underline !text-secondary"
                  >
                    Reschedule
                  </IconButton>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Data</div>
        )}
      </div>
    </div>
  );
};
