import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserMeetings } from "../../store/middlewares/meeting";
import { Button } from "../Button";

export const Interviews = () => {
  const profile = useSelector((state) => state.user.profile);
  const meetings = useSelector((state) => state.meeting.userMeetings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      dispatch(getUserMeetings(profile.id));
    }
  }, [profile]);

  const formatedDay = (timestamp) => {
    timestamp = parseInt(timestamp);
    const dateObject = new Date(timestamp);
    const day = dateObject.toLocaleDateString("en-US", { weekday: "long" });
    const date = dateObject.getDate();
    const month = dateObject.toLocaleDateString("en-US", { month: "long" });
    const year = dateObject.getFullYear();
    const timeInAmPm = dateObject.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${date} ${month} ${year} ${day} ${timeInAmPm}`;
  };

  const handleJoin = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      {meetings && meetings.length ? (
        <>
          {meetings.map((meeting) => {
            return (
              <div
                key={meeting.id}
                className="flex items-center justify-between px-4 py-1 my-2 rounded-md border "
              >
                <div>{formatedDay(meeting.dayHour)}</div>
                <div>
                  {profile.id === meeting.acceptor ? (
                    <div>
                      Initiated By: {meeting.initiatorProfile.firstName}{" "}
                      {meeting.initiatorProfile.lastName}
                    </div>
                  ) : (
                    <div>
                      Accepted by: {meeting.acceptorProfile.firstName}{" "}
                      {meeting.acceptorProfile.lastName}
                    </div>
                  )}
                </div>
                <div>
                  <Button onClick={() => handleJoin(meeting.meet)}>Join</Button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="text-center mt-20">You have no upcoming interviews</div>
      )}
    </div>
  );
};
