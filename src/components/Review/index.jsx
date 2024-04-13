import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMeeting } from "../../store/middlewares/meeting";
import { setMeetingDetails } from "../../store/slices/meeting";
import { getDataLabelFromKey } from "../../utils/data";
import { InterviewerReview } from "./InterviewerReview";
import { SelfReview } from "./SelfReview";

export const Review = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user.profile);
  const meetingDetails = useSelector((state) => state.meeting.details);
  const allSkill = useSelector((state) => state.profession.allSkill);

  const [tabs, setTabs] = useState();
  const [interviewer, setInterviewer] = useState();

  function idExists(name, arr) {
    return arr.some((obj) => obj.name === name);
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("meeting");
    if (location.search && id) {
      dispatch(getSingleMeeting(id));
    }
    return () => dispatch(setMeetingDetails(null));
  }, [location.search]);

  useEffect(() => {
    if (meetingDetails) {
      if (user.id === meetingDetails.acceptor) {
        setInterviewer(meetingDetails.initiatorProfile);
      } else {
        setInterviewer(meetingDetails.acceptorProfile);
      }
      setTabs([
        {
          id: 1,
          name: "Review Interviewer",
          component: (
            <InterviewerReview
              meeting={meetingDetails}
              interviewer={interviewer}
            />
          ),
        },
      ]);
      if (meetingDetails.practiceAreas) {
        setTabs((prev) => {
          for (let pa of meetingDetails.practiceAreas) {
            const paName = getDataLabelFromKey(allSkill, pa);
            if (!idExists(paName, prev)) {
              prev.push({
                id: prev.length + 1,
                name: paName,
                component: (
                  <SelfReview meeting={meetingDetails} practiceAreaId={pa} />
                ),
              });
            }
          }
          return prev;
        });
      }
    }
  }, [meetingDetails]);

  return (
    <div className="p-6">
      {meetingDetails && <HorizontalTabs data={tabs} />}
    </div>
  );
};
