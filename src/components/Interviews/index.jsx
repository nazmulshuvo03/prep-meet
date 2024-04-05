import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserMeetings } from "../../store/middlewares/meeting";
import { Past } from "./Past";
import { Upcoming } from "./Upcoming";
import { MostRecent } from "./MostRecent";

export const Meetings = () => {
  const profile = useSelector((state) => state.user.profile);
  const meetings = useSelector((state) => state.meeting.userMeetings);
  const dispatch = useDispatch();
  const [mostRecent, setMostRecent] = useState();
  const [upcoming, setUpcoming] = useState();
  const [past, setPast] = useState();

  const splitByTime = (arr) => {
    const past = [];
    const nowAndFuture = [];
    const currentTime = new Date().getTime();
    arr.forEach((obj) => {
      const timeValue = obj.dayHour;
      if (timeValue <= currentTime) {
        past.push(obj);
      } else {
        nowAndFuture.push(obj);
      }
    });
    nowAndFuture.sort((a, b) => a.dayHour - b.dayHour);
    const mostRecent = nowAndFuture.shift();
    return { past, nowAndFuture, mostRecent };
  };

  useEffect(() => {
    if (profile) {
      dispatch(getUserMeetings(profile.id));
    }
  }, [profile]);

  useEffect(() => {
    if (meetings && meetings.length) {
      const { past, nowAndFuture, mostRecent } = splitByTime(meetings);
      setPast(past);
      setUpcoming(nowAndFuture);
      setMostRecent(mostRecent);
    }
  }, [meetings]);

  return (
    <div className="px-3 md:px-10 py-3 md:py-6 pb-2  h-full overflow-y-auto overflow-x-hidden">
      {meetings && meetings.length ? (
        <div className="grid grid-cols-1 gap-4">
          <MostRecent data={mostRecent} />
          <Upcoming data={upcoming} />
          <Past data={past} />
        </div>
      ) : (
        <div className="text-center mt-20">You have no upcoming interviews</div>
      )}
    </div>
  );
};
