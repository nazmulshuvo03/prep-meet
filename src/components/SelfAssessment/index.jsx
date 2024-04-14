import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMeeting } from "../../store/middlewares/meeting";
import { setMeetingDetails } from "../../store/slices/meeting";
import { getDataLabelFromKey } from "../../utils/data";
import { SelfReview } from "./SelfReview";

export const SelfAssessment = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const meetingDetails = useSelector((state) => state.meeting.details);
  const allSkill = useSelector((state) => state.profession.allSkill);

  const [tabs, setTabs] = useState([]);

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
    if (meetingDetails && meetingDetails.practiceAreas) {
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
  }, [meetingDetails]);

  return (
    <div className="p-6">
      {tabs && tabs.length && <HorizontalTabs data={tabs} />}
    </div>
  );
};
