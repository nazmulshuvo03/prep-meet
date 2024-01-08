import { setUserAvailabilities } from ".";
import {
  addUserAvailabilities,
  getUserAvailabilities,
} from "../../firebase/functions/availabilities";

export const fetchUserAvailabilities = (userId) => async (dispatch) => {
  const userDocs = await getUserAvailabilities(userId);
  if (userDocs) {
    dispatch(setUserAvailabilities(userDocs));
  }
};

export const createOrUpdateUserAvailability = (data) => async (dispatch) => {
  console.log("@@@ received data: ", data);
  const createRes = await addUserAvailabilities(data);
  console.log("@@ created res: ", createRes);
  if (createRes) {
    dispatch(setUserAvailabilities(createRes));
  }
};
