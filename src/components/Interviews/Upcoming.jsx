import { useSelector } from "react-redux";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";
import { getDataLabelFromKey } from "../../utils/data";

export const Upcoming = ({ data }) => {
  const profile = useSelector((state) => state.user.profile);
  const companies = useSelector((state) => state.static.companies);

  return (
    <div className="rounded-md bg-white p-2">
      <div className="text-xl font-semibold py-2">Upcoming Interviews</div>
      <div className="shadow-md rounded-md">
        <div className="grid grid-cols-4 bg-gray-200 px-2 py-2 text-sm font-semibold rounded-t-md">
          <div>Date</div>
          <div>Type</div>
          <div>Name</div>
          <div>Company</div>
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
                <div>N/A</div>
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