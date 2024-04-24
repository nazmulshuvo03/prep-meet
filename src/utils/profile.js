import { COMPLETION_ITEMS } from "../constants/Profile";

export const completionRemaining = (obj) => {
  const falses = listOfFalses(obj);
  if (falses.length === 3) {
    return `${falses[0]}, ${falses[1]} and ${falses[2]}`;
  } else if (falses.length === 2) {
    return `${falses[0]} and ${falses[1]}`;
  } else if (falses.length === 1) {
    return `${falses[0]}`;
  } else {
    return `all required items`;
  }
};

export const listOfFalses = (obj) => {
  const falses = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key] === false) falses.push(COMPLETION_ITEMS[key]);
  });
  return falses;
};
