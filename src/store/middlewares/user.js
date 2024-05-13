import { TOAST_TYPES } from "../../constants/Toast";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { fetchContent, postContent, putContent } from "../../services/api";
import {
  all_profile_url,
  all_users_url,
  public_user_url,
  user_email_subscription_url,
  user_progress,
  user_url,
  users_check_prop_url,
} from "../../services/urls/user";
import { setLoading, setToastMessage } from "../slices/global";
import {
  setCompletionStatus,
  setPeople,
  setProfile,
  setUserProgress,
  setVisitingProfile,
  updateEmailSubscriptionState,
  updateProfile,
} from "../slices/user";
import { setTargetProfession } from "../slices/profession";
import { setUserAvailabilities } from "../slices/availability";

export const fetchPeople = (query = "") =>
  asyncWrapper(async (dispatch) => {
    console.log("dashboard query: ", query);
    dispatch(setLoading());
    const response = await fetchContent(all_profile_url(query));
    console.log("Profile docs: ", response);
    responseHandler(response, dispatch(setPeople(response.data)));
    dispatch(setLoading(false));
  });

export const fetchUsers = (queries = []) =>
  asyncWrapper(async (dispatch) => {
    const response = await fetchContent(all_users_url());
    responseHandler(response);
  });

export const fetchUserProfile = (
  userId,
  successHandler = () => {},
  errorHandler = () => {}
) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const response = await fetchContent(user_url(userId));
    console.log("user doc: ", response);
    const handleSuccess = () => {
      dispatch(setProfile(response.data));
      dispatch(setTargetProfession(response.data.targetProfessionId));
      dispatch(setUserAvailabilities(response.data.availabilities));
      successHandler();
    };
    responseHandler(response, handleSuccess, errorHandler);
    dispatch(setLoading(false));
  });

export const visitUserProfile = (userId) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const response = await fetchContent(public_user_url(userId));
    console.log("user doc: ", response);
    responseHandler(response, () => {
      dispatch(setVisitingProfile(response.data));
    });
    dispatch(setLoading(false));
  });

export const updateUserData = (userId, updatedData) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await putContent(user_url(userId), updatedData);
    console.log("user data updated: ", res);
    const handleSuccess = () => {
      dispatch(updateProfile(res.data));
      if (res.data.targetProfessionId) {
        dispatch(setTargetProfession(res.data.targetProfessionId));
      }
      if (res.data.completionStatus)
        dispatch(setCompletionStatus(res.data.completionStatus));
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[0],
          message: "Personal Details Updated",
        })
      );
    };
    const handleError = () => {
      dispatch(setToastMessage({ type: TOAST_TYPES[1], message: res.data }));
    };
    responseHandler(res, handleSuccess, handleError);
    dispatch(setLoading(false));
  });

export const checkUserProperty = (obj) => async (dispatch) => {
  const res = await postContent(users_check_prop_url(), obj);
  console.log("Check user prop response: ", res);
  return res.data?.exists;
};

export const getUserProgress = () =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await fetchContent(user_progress());
    console.log("User progress response: ", res);
    responseHandler(
      res,
      () => {
        dispatch(setUserProgress(res.data));
      },
      () => {
        dispatch(setToastMessage({ type: TOAST_TYPES[1], message: res.data }));
      }
    );
    dispatch(setLoading(false));
  });

export const changeUserSubscription = (data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await putContent(user_email_subscription_url(), data);
    console.log("user subscription changed response: ", res);
    responseHandler(
      res,
      () => {
        dispatch(updateEmailSubscriptionState(res.data.unsubscribed));
      },
      () => {
        () => {
          dispatch(
            setToastMessage({ type: TOAST_TYPES[1], message: res.data })
          );
        };
      }
    );
    dispatch(setLoading(false));
  });
