import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, database } from "..";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const getUserDocs = async () => {
  try {
    let response = [];
    const querySnapshot = await getDocs(collection(database, "profiles"));
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
    console.error("Error getting documents: ", e);
    return null;
  }
};

export const getSingleUserDoc = async (userId) => {
  try {
    const snapshot = await getDoc(doc(database, "profiles", userId));
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

export const getSingleUserFromUID = async (uid) => {
  try {
    const q = query(collection(database, "profiles"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    console.log("@@@@@@@@@@@", querySnapshot.docs[0].data());
    if (querySnapshot) {
      const snapshot = querySnapshot.docs[0];
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

export const addUserDoc = async (data) => {
  try {
    const docRef = await addDoc(collection(database, "profiles"), data);
    let user = getSingleUserDoc(docRef.id);
    return user;
  } catch (e) {
    console.error("Error adding document: ", e.message);
    alert("Error adding document: ", e.message);
    return null;
  }
};

export const updateUserDoc = async (userId, updatedData) => {
  try {
    const docRef = doc(database, "profiles", userId);
    await updateDoc(docRef, updatedData);
  } catch (e) {
    console.error("Error updating document: ", e.message);
    alert("Error updating document: ", e.message);
    return null;
  }
};

export const createUser = async (data) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    await updateProfile(userCredential.user, {
      displayName: `${data.firstName} ${data.lastName}`,
      metadata: data,
    });
    console.log("@@@@ user created", userCredential.user);
    return userCredential.user;
  } catch (e) {
    console.error("Error creating user: ", e.message);
    alert(e.message);
    return null;
  }
};

export const signInUser = async (data) => {
  try {
    const userCreds = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    console.log("@@@@@@@@ user signed in: ", userCreds);
    return userCreds.user;
  } catch (e) {
    console.error("Error signing in user: ", e.message);
    alert(e.message);
    return null;
  }
};

export const signoutUser = async () => {
  try {
    signOut(auth)
      .then(() => {
        console.log("Signed out user");
        alert("Signed out user");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};
