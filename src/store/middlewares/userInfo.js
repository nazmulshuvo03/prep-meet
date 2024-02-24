import { TOAST_TYPES } from "../../constants/Toast";
import { deleteContent, postContent } from "../../services/api";
import {
  all_workexperience_url,
  single_workexperience_url,
} from "../../services/urls/userInfo";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { setLoading, setToastMessage } from "../slices/global";
import { removeWorkExperience, updateWorkExperience } from "../slices/user";

export const addWorkExperience = (data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await postContent(all_workexperience_url(), data);
    console.log("Work experience adding response: ", res);

    responseHandler(
      res,
      () => {
        dispatch(setLoading(false));
        dispatch(updateWorkExperience(res.data));
      },
      () => {
        dispatch(setLoading(false));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
  });

export const deleteWorkExperience = (id) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await deleteContent(single_workexperience_url(id));
    console.log("Work experience delete response: ", res);

    responseHandler(
      res,
      () => {
        dispatch(removeWorkExperience(id));
        dispatch(setLoading(false));
      },
      () => {
        dispatch(setLoading(false));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
  });
