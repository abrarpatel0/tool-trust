import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

export const uploadToolImage = async (file, userId, toolId) => {
  if (!file) return null;

  const imageRef = ref(
    storage,
    `tool-images/${userId}/${toolId || "temp"}/${Date.now()}_${file.name}`
  );

  const snapshot = await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};
