import { TOAST_TYPES } from "../../constants/Toast";
import { fetchContent, postContent } from "../../services/api";
import {
  all_companies_url,
  all_experience_levels_url,
  all_preparation_stages_url,
} from "../../services/urls/static";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { setToastMessage } from "../slices/global";
import {
  setCompanies,
  setExperienceLevels,
  setPreparationStages,
  updateCompaniesState,
} from "../slices/static";

export const fetchExperienceLevels = () =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(all_experience_levels_url());
    console.log("Experience levels respnse: ", res);
    responseHandler(res, () => {
      dispatch(setExperienceLevels(res.data));
    });
  });

export const fetchPreparationStages = () =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(all_preparation_stages_url());
    console.log("Preparation stages respnse: ", res);
    responseHandler(res, dispatch(setPreparationStages(res.data)));
  });

export const fetchCompanies = () =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(all_companies_url());
    console.log("Companies respnse: ", res);
    responseHandler(res, dispatch(setCompanies(res.data)));
  });

export const addCompany = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(all_companies_url(), data);
    console.log("Company Added", res);
    responseHandler(
      res,
      () => {
        dispatch(updateCompaniesState(res.data));
      },
      () =>
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        )
    );
  });
