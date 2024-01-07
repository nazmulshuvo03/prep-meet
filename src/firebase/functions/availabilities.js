import { collection, getDocs } from "firebase/firestore";
import { database } from "..";

export const getUserAvailabilities = async (userId) => {
  try {
    let response = [];
    let querySnapshot = await getDocs(collection(database, "availabilities"));
    querySnapshot.forEach(async (doc) => {
      if (doc.exists()) {
        let resItem = {
          id: doc.id,
          ...doc.data(),
        };
        response.push(resItem);
      }
    });
    return response;
  } catch (e) {
    console.error("Error getting user availabilities: ", e.message);
    alert("Error getting user availabilities: ", e.message);
    return null;
  }
};
