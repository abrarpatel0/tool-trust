import { auth } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};
