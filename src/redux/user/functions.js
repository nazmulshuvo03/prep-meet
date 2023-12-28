import {
  addUserDoc,
  createUser,
  getSingleUserDoc,
  getSingleUserFromUID,
  getUserDocs,
  signInUser,
  signoutUser,
} from "../../firebase/functions/user";
import { setPeople, setProfile, updatePeople } from ".";

export const fetchPeople = () => async (dispatch) => {
  const userDocs = await getUserDocs();
  if (userDocs) {
    dispatch(setPeople(userDocs));
  }
};

export const fetchProfile = (userId) => async (dispatch) => {
  const userDoc = await getSingleUserDoc(userId);
  if (userDoc) {
    dispatch(setProfile(userDoc));
  }
};

export const fetchAccountDetails = (uid) => async (dispatch) => {
  const userDoc = await getSingleUserFromUID(uid);
  if (userDoc) {
    dispatch(setProfile(userDoc));
  }
};

export const signupUser = (data) => async (dispatch, getState) => {
  // const currentState = getState();
  // const currentPeople = currentState.user.people;

  const user = await createUser(data);
  const { password, ...dataWithoutPass } = data;
  dataWithoutPass.uid = user.uid;
  const createdUser = await addUserDoc(dataWithoutPass);
  if (createdUser) {
    dispatch(setProfile(createdUser));
    // dispatch(updatePeople(createdUser));
  }
};

export const loginUser = (data) => async (dispatch) => {
  const user = await signInUser(data);
  const profile = await getSingleUserFromUID(user.uid);
  if (profile) {
    dispatch(setProfile(profile));
  }
};

export const logoutUser = () => async (dispatch) => {
  await signoutUser();
  dispatch(setProfile());
};
