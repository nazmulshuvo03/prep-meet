import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { fetchContent, postContent } from "../../services/api";
import { meeting_url, user_meeting_url } from "../../services/urls/meeting";
import { updateAvailabilityState } from "../slices/availability";
import { setUserMeetings } from "../slices/meeting";
import { setLoading, setToastMessage } from "../slices/global";
import { TOAST_TYPES } from "../../constants/Toast";
import {
  updatePeopleAvailability,
  updateVisitorProfileAvailability,
} from "../slices/user";

export const getUserMeetings = (userId) =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(user_meeting_url(userId));
    console.log("User meetings", res);
    responseHandler(res, dispatch(setUserMeetings(res.data)));
  });

export const createMeeting = (
  data,
  page = "" // called from 2 pages: "visit" and "people"
) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await postContent(meeting_url(), data);
    console.log("meeting response: ", res);
    responseHandler(
      res,
      () => {
        dispatch(updateAvailabilityState(res.data));
        if (page === "visit") dispatch(updateVisitorProfileAvailability(data));
        if (page === "people") dispatch(updatePeopleAvailability(data));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[0],
            message: "Meeting scheduled",
          })
        );
      },
      () => {
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
    dispatch(setLoading(false));
  });
