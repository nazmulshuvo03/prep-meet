import { fetchContent } from "../../services/api";
import { all_profile_url } from "../../services/urls/user";
import { setPeople } from "../slices/user";

export const fetchPeople =
  (queries = []) =>
  async (dispatch) => {
    const userDocs = await fetchContent(all_profile_url());
    console.log("User docs: ", userDocs);
    if (userDocs) {
      dispatch(setPeople(userDocs.data));
    }
  };
