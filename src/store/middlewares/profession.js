import { responseHandler } from "../../helper/api";
import { fetchContent, postContent } from "../../services/api";
import {
  all_professions_url,
  profession_url,
} from "../../services/urls/profession";
import { setProfessions } from "../slices/profession";

export const fetchProfessions = () => async (dispatch) => {
  const res = await fetchContent(all_professions_url());
  console.log("Profession docs: ", res);
  responseHandler(res, dispatch(setProfessions(res.data)));
};

export const addProfession = (data) => async (dispatch) => {
  const res = await postContent(profession_url(), data);
  console.log("Profession doc: ", res);
  responseHandler(res, () => console.log("Profession added: ", res.data));
};