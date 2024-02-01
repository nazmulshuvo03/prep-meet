import { responseHandler } from "../../helper/api";
import { fetchContent, putContent } from "../../services/api";
import {
  all_profile_url,
  all_users_url,
  user_url,
} from "../../services/urls/user";
import { setLoading } from "../slices/global";
import { setPeople, setProfile } from "../slices/user";

export const fetchPeople =
  (query = "") =>
  async (dispatch) => {
    console.log("dashboard query: ", query);
    dispatch(setLoading());
    const response = await fetchContent(all_profile_url(query));
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

export const visitUserProfile =
  (userId, successHandler = () => {}, errorHandler = () => {}) =>
  async (dispatch) => {
    const response = await fetchContent(user_url(userId));
    console.log("user doc: ", response);
    return response.data;
  };

export const updateUserData = (userId, updatedData) => async (dispatch) => {
  const res = await putContent(user_url(userId), updatedData);
  console.log("user data updated: ", res);
  responseHandler(res, dispatch(setProfile(res.data)));
};
