import { responseHandler } from "../../helper/api";
import { asyncWrapper } from "../../helper/async";
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

export const fetchUserAvailabilities = (userId) =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(user_availability_url(userId));
    console.log("user availabilities: ", res);
    responseHandler(res, dispatch(setUserAvailabilities(res.data)));
  });

export const visitUserAvailabilities = (userId) =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(user_availability_url(userId));
    console.log("user availabilities: ", res);
    return res.data;
  });

export const createUserAvailability = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(availability_url(), data);
    console.log("availability create", res);
    if (res.data === "Deleted") {
      responseHandler(res, dispatch(removeAvailability(data)));
    } else {
      responseHandler(res, dispatch(updateUserAvailabilities(res.data)));
    }
  });

