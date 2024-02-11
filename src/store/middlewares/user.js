import { TOAST_TYPES } from "../../constants/Toast";
import { responseHandler } from "../../helper/api";
import { fetchContent, putContent } from "../../services/api";
import {
  all_profile_url,
  all_users_url,
  user_url,
} from "../../services/urls/user";
import { setLoading, setToastMessage } from "../slices/global";
import { setPeople, setProfile } from "../slices/user";

export const fetchPeople =
  (userId = null, query = "") =>
  async (dispatch) => {
    console.log("dashboard query: ", query);
    dispatch(setLoading());
    const response = await fetchContent(all_profile_url(userId, query));
    console.log("Profile docs: ", response);
    responseHandler(response, dispatch(setPeople(response.data)));
    dispatch(setLoading(false));
  };

export const fetchUsers =
  (queries = []) =>
  async (dispatch) => {
    const response = await fetchContent(all_users_url());
    responseHandler(response);
  };

export const fetchUserProfile =
  (userId, successHandler = () => {}, errorHandler = () => {}) =>
  async (dispatch) => {
    const response = await fetchContent(user_url(userId));
    console.log("user doc: ", response);
    const handleSuccess = () => {
      dispatch(setProfile(response.data));
      successHandler();
    };
    responseHandler(response, handleSuccess, errorHandler);
  };

export const visitUserProfile = (userId) => async (dispatch) => {
  const response = await fetchContent(user_url(userId));
  console.log("user doc: ", response);
  return response.data;
};

export const updateUserData = (userId, updatedData) => async (dispatch) => {
  dispatch(setLoading());
  const res = await putContent(user_url(userId), updatedData);
  console.log("user data updated: ", res);
  const handleSuccess = () => {
    dispatch(setProfile(res.data));
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
};
