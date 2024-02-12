import { TOAST_TYPES } from "../../constants/Toast";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { fetchContent, postContent } from "../../services/api";
import {
  user_availability_url,
  availability_url,
} from "../../services/urls/availability";
import { formatHourWithAMPM } from "../../utils/timeDate";
import {
  removeAvailability,
  setUserAvailabilities,
  updateUserAvailabilities,
} from "../slices/availability";
import { setToastMessage } from "../slices/global";

export const fetchUserAvailabilities = (userId) =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(user_availability_url(userId));
    console.log("user availabilities: ", res);
    responseHandler(res, dispatch(setUserAvailabilities(res.data)));
  });

export const visitUserAvailabilities = (userId) => async (dispatch) => {
  const res = await fetchContent(user_availability_url(userId));
  console.log("user availabilities: ", res);
  return res.data;
};

export const createUserAvailability = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(availability_url(), data);
    console.log("availability create", data, res);
    if (res.data === "Deleted") {
      responseHandler(
        res,
        () => {
          dispatch(removeAvailability(data));
          dispatch(
            setToastMessage({
              type: TOAST_TYPES[0],
              message: `${new Date(data.day)} ${formatHourWithAMPM(
                data.hour
              )} removed`,
            })
          );
        },
        () => {
          dispatch(
            setToastMessage({
              type: TOAST_TYPES[1],
              message: `Error removing ${formatHourWithAMPM(data.hour)}`,
            })
          );
        }
      );
    } else {
      responseHandler(
        res,
        () => {
          dispatch(updateUserAvailabilities(res.data));
          dispatch(
            setToastMessage({
              type: TOAST_TYPES[0],
              message: `${new Date(data.day)} ${formatHourWithAMPM(
                data.hour
              )} added`,
            })
          );
        },
        () => {
          dispatch(
            setToastMessage({
              type: TOAST_TYPES[1],
              message: `Error adding ${formatHourWithAMPM(data.hour)}`,
            })
          );
        }
      );
    }
  });
