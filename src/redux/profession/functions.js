import { setKeyLabelPairs, setProfessions, updateProfessions } from ".";
import {
  addProfessionDoc,
  getProfessionDocs,
} from "../../firebase/functions/profession";

export const fetchProfessions = () => async (dispatch) => {
  const userDocs = await getProfessionDocs();
  if (userDocs) {
    dispatch(setProfessions(userDocs));
    let modified = [];
    for (let item of userDocs) {
      modified.push({ key: item.id, label: item.name });
    }
    dispatch(setKeyLabelPairs(modified));
  }
};

export const addProfession = (data) => async (dispatch) => {
  const createdUser = await addProfessionDoc(data);
  if (createdUser) {
    dispatch(updateProfessions(createdUser));
  }
};
