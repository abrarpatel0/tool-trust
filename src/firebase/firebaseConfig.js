import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYRLmMMA9t2JJDnpUbTaYGMKjInNHirwU",
  authDomain: "tool-trust.firebaseapp.com",
  projectId: "tool-trust",
  storageBucket: "tool-trust.appspot.com",
  messagingSenderId: "888226415170",
  appId: "1:888226415170:web:e62c188b4171ba44ab23db",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
