import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "..";

export const uploadImage = async (image) => {
  try {
    const storageRef = ref(storage, "images/" + image.name);
    await uploadBytesResumable(storageRef, image);

    // Get download URL
    const imageUrl = await getDownloadURL(storageRef);
    console.log("image uploaded in: ", imageUrl);
    return imageUrl;
  } catch (e) {
    console.log("Error uploading image: ", e.message);
    alert("Error uploading image: ", e.message);
    return "";
  }
};
