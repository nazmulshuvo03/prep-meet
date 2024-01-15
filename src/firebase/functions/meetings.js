import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { database } from "..";

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
