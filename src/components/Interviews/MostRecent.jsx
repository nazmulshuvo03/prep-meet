import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconButton } from "../Button/IconButton";
import { getDataLabelFromKey } from "../../utils/data";
import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";
import { Button } from "../Button";

export const MostRecent = ({ data }) => {
  const profile = useSelector((state) => state.user.profile);
  const allSkill = useSelector((state) => state.profession.allSkill);
  const companies = useSelector((state) => state.static.companies);

  const [meetingUser, setMeetingUser] = useState();
  const [remaining, setRemaining] = useState({
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    if (data && profile) {
      setMeetingUser(
        profile.id === data.acceptor
          ? data.initiatorProfile
          : data.acceptorProfile
      );
    }
  }, [data]);

  function getTimeAndDayDifference(timestamp) {
    const currentTime = new Date().getTime();
    const targetTime = new Date(timestamp).getTime();
    const timeDifference = Math.abs(currentTime - targetTime);
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return {
      daysDifference,
      hoursDifference,
      minutesDifference,
      secondsDifference,
    };
  }

  useEffect(() => {
    if (data) {
      const timestamp = parseInt(data.dayHour);
      const interval = setInterval(() => {
        const difference = getTimeAndDayDifference(timestamp);
        setRemaining({
          day: difference.daysDifference,
          hour: difference.hoursDifference,
          min: difference.minutesDifference,
          sec: difference.secondsDifference,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const handleJoin = () => {
    window.open(data.meet, "_blank");
  };

  return (
    <div className="rounded-md bg-white p-2">
      <div className="text-xl font-semibold pt-2 pb-6">Next Interview</div>
      {data && meetingUser ? (
        <div className="flex justify-between items-center">
          <div className="border-l-2 px-1">
            <div className="text-xs text-gray-400 pb-3">
              {
                convertISOUTCDayTimeToLocalDayTime(data.dayHourUTC)
                  .dateMonthView
              }
              {", "}
              {convertISOUTCDayTimeToLocalDayTime(data.dayHourUTC).time}
            </div>
            <div className="flex flex-col items-center px-10">
              <img
                src={meetingUser.photoURL}
                alt={"Person Profile Image"}
                className="h-32 w-32 rounded-md"
              />
              <div className="flex items-baseline gap-2 font-semibold text-md">
                <span>{meetingUser.userName}</span>
                <IconButton
                  className={`!text-secondary !font-light`}
                  style={{ fontSize: 8 }}
                >
                  Learn More
                </IconButton>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <div>
              <span className="font-semibold">Current Company: </span>
              <span>
                {meetingUser.workExperiences &&
                meetingUser.workExperiences.length
                  ? getDataLabelFromKey(
                      companies,
                      meetingUser.workExperiences[0].companyId
                    )
                  : ""}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">Target Company: </span>
              <>
                {meetingUser.companiesOfInterest &&
                meetingUser.companiesOfInterest.length ? (
                  <>
                    {meetingUser.companiesOfInterest.map((ci, i) => (
                      <span key={ci}>
                        {getDataLabelFromKey(companies, ci)}
                        {i < meetingUser.companiesOfInterest.length - 1 ? (
                          <span>,</span>
                        ) : (
                          <span />
                        )}
                      </span>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </>
            </div>
            <div>
              <span className="font-semibold">Work Experience: </span>
              <span>X years</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">Interested to Practice: </span>
              <>
                {meetingUser.focusAreas && meetingUser.focusAreas.length ? (
                  <div className="flex gap-1">
                    {meetingUser.focusAreas.map((fa) => (
                      <span
                        key={fa}
                        className="bg-purple-100 text-purple-700 px-4 py-0.5 rounded-full text-xs"
                      >
                        {getDataLabelFromKey(allSkill, fa)}
                      </span>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-8">
            <div className="flex flex-col items-center gap-1">
              <Button
                size="small"
                className={"w-full !bg-secondary border border-secondary"}
                onClick={handleJoin}
              >
                Join Call
              </Button>
              <div className="text-xs text-gray-400">
                {remaining.day > 0 ? <>{remaining.day}:</> : ""}
                {remaining.hour > 0 ? <>{remaining.hour}:</> : ""}
                {remaining.min > 0 ? <>{remaining.min}:</> : ""}
                {remaining.sec}
              </div>
            </div>
            <Button
              size="small"
              className={
                "w-full !bg-transparent border !border-gray-400 !text-gray-400"
              }
            >
              Reschedule
            </Button>
          </div>
        </div>
      ) : (
        <div>You have no interview</div>
      )}
    </div>
  );
};