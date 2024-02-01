import { responseHandler } from "../../helper/api";
import { fetchContent, postContent } from "../../services/api";
import { meeting_url, user_meeting_url } from "../../services/urls/meeting";
import { updateAvailabilityState } from "../slices/availability";
import { setUserMeetings } from "../slices/meeting";

export const getUserMeetings = (userId) => async (dispatch) => {
  const res = await fetchContent(user_meeting_url(userId));
  console.log("User meetings", res);
  responseHandler(res, dispatch(setUserMeetings(res.data)));
};

export const createMeeting = (data) => async (dispatch) => {
  const res = await postContent(meeting_url(), data);
  console.log("meeting response: ", res);
  responseHandler(res, dispatch(updateAvailabilityState(res.data)));
};
