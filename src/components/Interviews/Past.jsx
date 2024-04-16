import { useSelector } from "react-redux";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";
import { getDataLabelFromKey } from "../../utils/data";
import useDeviceSize from "../../hooks/useDeviceSize";
import { IconButton } from "../Button/IconButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CapsulList } from "../Capsul/CapsulList";

export const Past = ({ data }) => {
  const history = useHistory();
  const deviceSize = useDeviceSize();
  const profile = useSelector((state) => state.user.profile);
  const companies = useSelector((state) => state.static.companies);
  const allSkill = useSelector((state) => state.profession.allSkill);

  const handleNotesClick = (id) => {
    history.push({
      search: `?open=note&meeting=${id}`,
    });
  };

  const handleFeedbackClick = (id) => {
    history.push({
      search: `?open=review&meeting=${id}`,
    });
  };

  return (
    <div className="rounded-md bg-white p-2 overflow-x-auto md:overflow-x-hidden !overflow-y-auto">
      <div className="text-xl font-semibold py-2">Past Interviews</div>
      <div
        className="shadow-md rounded-md"
        style={deviceSize === "sm" ? { width: "30rem" } : {}}
      >
        <div className="grid grid-cols-6 bg-gray-200 px-2 py-2 text-sm font-semibold rounded-t-md">
          <div>Date</div>
          <div>Type</div>
          <div>Name</div>
          <div>Company</div>
          <div>Your Feedback</div>
          <div>Peer Feedback</div>
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
                className={`grid grid-cols-6 items-center px-2 py-2 text-sm font-normal ${
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
                <CapsulList data={meeting.practiceAreas} labels={allSkill} />
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
                    onClick={() => handleNotesClick(meeting.id)}
                  >
                    See Notes
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    size="small"
                    className="!py-2 !text-xs underline !text-secondary"
                    onClick={() => handleFeedbackClick(meeting.id)}
                  >
                    Evaluate your experience
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
