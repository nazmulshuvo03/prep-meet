import { responseHandler } from "../../helper/api";
import { postContent } from "../../services/api";
import { meeting_url } from "../../services/urls/meeting";
import { updateAvailabilityState } from "../slices/availability";

export const createMeeting = (data) => async (dispatch) => {
  const res = await postContent(meeting_url(), data);
  console.log("meeting response: ", res);
  responseHandler(res, dispatch(updateAvailabilityState(res.data)));
};
