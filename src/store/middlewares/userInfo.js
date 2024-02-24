import { TOAST_TYPES } from "../../constants/Toast";
import { postContent } from "../../services/api";
import { all_workexperience_url } from "../../services/urls/userInfo";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { setLoading, setToastMessage } from "../slices/global";
import { updateWorkExperience } from "../slices/user";

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
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[0],
            message: `${res.data.company_name} added`,
          })
        );
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
