import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "..";
import { getSingleUserDoc } from "./user";

export const getSingleMeetingDoc = async (docId) => {
  try {
    const snapshot = await getDoc(doc(database, "meetings", docId));
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

export const createMeeting = async (data) => {
  try {
    const docRef = await addDoc(collection(database, "meetings"), data);
    const meeting = await getSingleMeetingDoc(docRef.id);
    return meeting;
  } catch (e) {
    console.error("Error adding meeting: ", e.message);
    alert("Error adding meeting: ", e.message);
    return null;
  }
};

export const getAcceptorsMeetings = async (acptId) => {
  try {
    const response = [];
    const querySnapshot = await getDocs(
      query(collection(database, "meetings"), where("acceptor", "==", acptId))
    );
    querySnapshot.forEach(async (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        let resItem = {
          id: doc.id,
          ...data,
        };
        response.push(resItem);
      }
    });
    for (let item of response) {
      const initiatorProfile = await getSingleUserDoc(item.initiator);
      item.initiatorProfile = initiatorProfile;
    }
    return response;
  } catch (e) {
    console.error("Error getting documents: ", e.message);
    alert("Error getting documents: ", e.message);
    return null;
  }
};
