import { fetchContent } from "../../services/api";
import {
  all_companies_url,
  all_experience_levels_url,
  all_preparation_stages_url,
} from "../../services/urls/static";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import {
  setCompanies,
  setExperienceLevels,
  setPreparationStages,
} from "../slices/static";

export const fetchExperienceLevels = () =>
  asyncWrapper(async (dispatch) => {
    const response = await fetchContent(all_experience_levels_url());
    console.log("Experience levels respnse: ", response);
    responseHandler(response, () => {
      dispatch(setExperienceLevels(response.data));
    });
  });

export const fetchPreparationStages = () =>
  asyncWrapper(async (dispatch) => {
    const response = await fetchContent(all_preparation_stages_url());
    console.log("Preparation stages respnse: ", response);
    responseHandler(response, dispatch(setPreparationStages(response.data)));
  });

export const fetchCompanies = () =>
  asyncWrapper(async (dispatch) => {
    const response = await fetchContent(all_companies_url());
    console.log("Companies respnse: ", response);
    responseHandler(response, dispatch(setCompanies(response.data)));
  });
