import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { database } from "..";

export const getProfessionDocs = async () => {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(database, "professions"));
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return null;
  }
};

export const getSingleProfessionDoc = async (id) => {
  try {
    const snapshot = await getDoc(doc(database, "professions", id));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting documents: ", e);
    return null;
  }
};

export const addProfessionDoc = async (data) => {
  try {
    const docRef = await addDoc(collection(database, "professions"), data);
    const snapshot = await getDoc(doc(database, "professions", docRef.id));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};
