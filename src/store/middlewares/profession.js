import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { fetchContent, postContent } from "../../services/api";
import {
  all_professions_url,
  single_profession_url,
} from "../../services/urls/profession";
import { setLoading } from "../slices/global";
import { setProfessions } from "../slices/profession";

export const fetchProfessions = () =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await fetchContent(all_professions_url());
    console.log("Profession docs: ", res);
    responseHandler(res, dispatch(setProfessions(res.data)));
    dispatch(setLoading(false));
  });

export const addProfession = (data) =>
  asyncWrapper(async (_dispatch) => {
    const res = await postContent(single_profession_url(), data);
    console.log("Profession doc: ", res);
    responseHandler(res, () => console.log("Profession added: ", res.data));
  });
