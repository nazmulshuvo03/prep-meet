import { setUserAvailabilities } from ".";
import {
  addUserAvailability,
  checkUserAvailability,
  getUserAvailabilities,
  updateUserAvailability,
} from "../../firebase/functions/availabilities";

export const fetchUserAvailabilities = (userId) => async (dispatch) => {
  const userDocs = await getUserAvailabilities(userId);
  if (userDocs) {
    dispatch(setUserAvailabilities(userDocs));
  }
};

export const createOrUpdateUserAvailability = (data) => async (dispatch) => {
  const found = await checkUserAvailability(data.userId, data.day);
  if (found) {
    updateUserAvailability(found.id, data);
  } else {
    await addUserAvailability(data);
  }
};
