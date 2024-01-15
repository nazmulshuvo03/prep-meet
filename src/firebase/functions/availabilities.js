import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "..";
import { combinedQuery } from "./helpers";

export const getUserAvailabilities = async (userId) => {
  try {
    let response = [];
    const today = new Date();
    const todayMidnight = today.setHours(0, 0, 0, 0);
    const queries = [
      { userId, rel: "==" },
      { day: todayMidnight, rel: ">=" },
    ];
    let querySnapshot = await getDocs(
      combinedQuery({ queries, dbName: "availabilities" })
    );
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

export const checkUserAvailability = async (userId, day = null) => {
  //     const tom = new Date(today.setDate(today.getDate() + 1));
  try {
    if (!day) {
      const today = new Date();
      day = today.setHours(0, 0, 0, 0);
    }
    const queries = [
      { userId, rel: "==" },
      { day, rel: "==" },
    ];
    let snapshot = await getDocs(
      combinedQuery({ queries, dbName: "availabilities" })
    );
    let doc = snapshot?.docs[0];
    if (doc && doc.exists()) {
      const formattedDoc = {
        id: doc.id,
        ...doc.data(),
      };
      return formattedDoc;
    } else return null;
  } catch (e) {
    console.error("Error getting user availabilitiy: ", e.message);
    alert("Error getting user availabilitiy: ", e.message);
    return null;
  }
};

export const getUserAvalDoc = async (docId) => {
  try {
    const snapshot = await getDoc(doc(database, "availabilities", docId));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting documents: ", e.message);
    alert("Error getting documents: ", e.message);
    return null;
  }
};

export const addUserAvailability = async (data) => {
  try {
    const docRef = await addDoc(collection(database, "availabilities"), data);
    let response = await getUserAvalDoc(docRef.id);
    return response;
  } catch (e) {
    console.error("Error adding user availability data: ", e.message);
    alert("Error adding user availability data: ", e.message);
    return null;
  }
};

export const updateUserAvailability = async (docId, updatedData) => {
  try {
    const docRef = doc(database, "availabilities", docId);
    await updateDoc(docRef, updatedData);
  } catch (e) {
    console.error("Error updating availability: ", e.message);
    alert("Error updating availability: ", e.message);
    return null;
  }
};
