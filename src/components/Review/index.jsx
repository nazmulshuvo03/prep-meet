import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { useDispatch } from "react-redux";
import { getSingleMeeting } from "../../store/middlewares/meeting";
import { setMeetingDetails } from "../../store/slices/meeting";

export const Review = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("meeting");
    if (id) {
      dispatch(getSingleMeeting(id));
    }
    return () => dispatch(setMeetingDetails(null));
  }, [location.search]);

  const TABS = [
    { id: 1, name: "Review Interviewer", component: <div>Empty Content</div> },
    { id: 2, name: "Review Interviewer", component: <div>Empty Content</div> },
    { id: 3, name: "Review Interviewer", component: <div>Empty Content</div> },
  ];

  return (
    <div className="p-6">
      <HorizontalTabs data={TABS} />
    </div>
  );
};
