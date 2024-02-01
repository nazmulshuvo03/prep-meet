import { responseHandler } from "../../helper/api";
import { fetchContent, postContent } from "../../services/api";
import {
  user_availability_url,
  availability_url,
} from "../../services/urls/availability";
import {
  removeAvailability,
  setUserAvailabilities,
  updateUserAvailabilities,
} from "../slices/availability";

export const fetchUserAvailabilities = (userId) => async (dispatch) => {
  const res = await fetchContent(user_availability_url(userId));
  console.log("user availabilities: ", res);
  responseHandler(res, dispatch(setUserAvailabilities(res.data)));
};

export const visitUserAvailabilities = (userId) => async (dispatch) => {
  const res = await fetchContent(user_availability_url(userId));
  console.log("user availabilities: ", res);
  return res.data;
};

export const createUserAvailability = (data) => async (dispatch) => {
  const res = await postContent(availability_url(), data);
  console.log("availability create", res);
  if (res.data === "Deleted") {
    responseHandler(res, dispatch(removeAvailability(data)));
  } else {
    responseHandler(res, dispatch(updateUserAvailabilities(res.data)));
  }
};

