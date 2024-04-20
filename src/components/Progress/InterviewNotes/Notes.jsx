import { useSelector } from "react-redux";
import { convertISOUTCDayTimeToLocalDayTime } from "../../../utils/timeDate";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { NoData } from "../../NoData";

export const Notes = ({ data = null }) => {
  const user = useSelector((state) => state.user.profile);

  return (
    <div className="h-full">
      {data && data.length ? (
        <>
          {data.map((item) => {
            const interviewerProfile =
              user.id === item.meeting.acceptorProfile.id
                ? item.meeting.initiatorProfile
                : item.meeting.acceptorProfile;
            return (
              <div
                key={item.id}
                className="my-3 bg-background py-2 px-1 rounded-sm text-gray-600"
              >
                <div className="pt-1 pb-3">{item.note}</div>
                <Link
                  to={`/user/${interviewerProfile.id}`}
                  className="flex gap-1 text-gray-500 text-xs italic"
                >
                  <div>-</div>
                  <div>{interviewerProfile.userName},</div>
                  <div>
                    {
                      convertISOUTCDayTimeToLocalDayTime(
                        item.meeting.dayHourUTC
                      ).dateMonthView
                    }
                  </div>
                  <div>
                    {
                      convertISOUTCDayTimeToLocalDayTime(
                        item.meeting.dayHourUTC
                      ).time
                    }
                  </div>
                </Link>
              </div>
            );
          })}
        </>
      ) : (
        <div className="h-2/3">
          <NoData message={`No notes yet`} size={62} />
        </div>
      )}
    </div>
  );
};
