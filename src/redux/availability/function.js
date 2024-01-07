import { setUserAvailabilities } from ".";
import { getUserAvailabilities } from "../../firebase/functions/availabilities";

export const fetchUserAvailabilities = (userId) => async (dispatch) => {
  const userDocs = await getUserAvailabilities(userId);
  if (userDocs) {
    dispatch(setUserAvailabilities(userDocs));
  }
};
