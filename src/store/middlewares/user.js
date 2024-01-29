import { fetchContent } from "../../services/api";
import { all_profile_url, all_users_url } from "../../services/urls/user";
import { setLoading } from "../slices/global";
import { setPeople } from "../slices/user";

export const fetchPeople =
  (queries = []) =>
  async (dispatch) => {
    dispatch(setLoading());
    const response = await fetchContent(all_profile_url());
    console.log("Profile docs: ", response);
    if (response.success) {
      dispatch(setPeople(response.data));
    } else {
      alert(response.data);
    }
    dispatch(setLoading(false));
  };

export const fetchUsers =
  (queries = []) =>
  async (dispatch) => {
    const response = await fetchContent(all_users_url());
    if (response.success) {
      console.log("User docs: ", response);
    } else {
      alert(response.data);
    }
  };
