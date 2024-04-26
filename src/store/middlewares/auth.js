import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { postContent } from "../../services/api";
import { login_url, logout_url, signup_url } from "../../services/urls/auth";
import { persistor } from "../index";
import { setAuthenticated, setToastMessage } from "../slices/global";
import { TOAST_TYPES } from "../../constants/Toast";
import {
  resetUserState,
  setCompletionStatus,
  setProfile,
} from "../slices/user";
import { setTargetProfession } from "../slices/profession";
import { setUserAvailabilities } from "../slices/availability";

export const logoutUser = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(logout_url(), data);
    responseHandler(res, () => {
      persistor.purge();
      dispatch(setAuthenticated(false));
      dispatch(resetUserState());
    });
  });

export const signupUser = (data) =>
  asyncWrapper(async (dispatch) => {
    const response = await postContent(signup_url(), data);
    console.log("user sign up response: ", response);
    responseHandler(
      response,
      () => {
        dispatch(setProfile(response.data));
        dispatch(setAuthenticated(true));
        dispatch(setTargetProfession(response.data.targetProfessionId));
        dispatch(setUserAvailabilities(response.data.availabilities));
        dispatch(setCompletionStatus(response.data.completionStatus));
        // window.location.href = "/onboard";
      },
      () => {
        dispatch(
          setToastMessage({ type: TOAST_TYPES[1], message: response.data })
        );
      }
    );
  });

export const loginUser = (data) =>
  asyncWrapper(async (dispatch) => {
    const response = await postContent(login_url(), data);
    console.log("user login response: ", response);
    responseHandler(
      response,
      () => {
        dispatch(setProfile(response.data));
        dispatch(setAuthenticated(true));
        dispatch(setTargetProfession(response.data.targetProfessionId));
        dispatch(setUserAvailabilities(response.data.availabilities));
        dispatch(setCompletionStatus(response.data.completionStatus));
      },
      () => {
        dispatch(
          setToastMessage({ type: TOAST_TYPES[1], message: response.data })
        );
      }
    );
  });
