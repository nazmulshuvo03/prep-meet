import { responseHandler } from "../../helper/api";
import { fetchContent, postContent } from "../../services/api";
import { availability_url } from "../../services/urls/availability";
import { setUserAvailabilities } from "../slices/availability";

export const fetchUserAvailabilities = (data) => async (dispatch) => {
  const res = await fetchContent(availability_url(), data);
  console.log("user availabilities: ", res);
  responseHandler(res, dispatch(setUserAvailabilities(res.data)));
};

export const createOrUpdateUserAvailability = (data) => async (dispatch) => {
  const res = await postContent(availability_url(), data);
  responseHandler(res, () => console.log("availability created: ", res.data));
};
