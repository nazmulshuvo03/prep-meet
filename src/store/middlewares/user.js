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
  (queries = []) =>
  async (dispatch) => {
    dispatch(setLoading());
    const response = await fetchContent(all_profile_url());
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
export const fetchProfile = (data) => async (dispatch) => {
  const response = await fetchContent(user_url(), data);
  console.log("user doc: ", response);
  responseHandler(response, dispatch(setProfile(response.data)));
};

export const updateUserData = (updatedData) => async (dispatch) => {
  const res = await putContent(user_url(), updatedData);
  console.log("user data updated: ", res);
  responseHandler(res, dispatch(setProfile(res.data)));
};
