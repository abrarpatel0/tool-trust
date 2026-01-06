import { db } from "../firebase/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

/* =========================
   USER OPERATIONS
========================= */

export const createUserProfile = async (uid, userData) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    ...userData,
    createdAt: serverTimestamp(),
  });
};

export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

/* =========================
   TOOL OPERATIONS
========================= */

export const addTool = async (toolData) => {
  const toolsRef = collection(db, "tools");
  const docRef = await addDoc(toolsRef, {
    ...toolData,
    availability: "available",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getAllTools = async () => {
  const q = query(
    collection(db, "tools"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getUserTools = async (userId) => {
  const q = query(
    collection(db, "tools"),
    where("ownerId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getToolById = async (toolId) => {
  const toolRef = doc(db, "tools", toolId);
  const toolSnap = await getDoc(toolRef);
  return toolSnap.exists()
    ? { id: toolSnap.id, ...toolSnap.data() }
    : null;
};

export const updateTool = async (toolId, updates) => {
  await updateDoc(doc(db, "tools", toolId), updates);
};

export const deleteTool = async (toolId) => {
  await deleteDoc(doc(db, "tools", toolId));
};

/* =========================
   RENTAL OPERATIONS
========================= */

export const createRental = async (rentalData) => {
  await addDoc(collection(db, "rentals"), {
    ...rentalData,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};

export const getUserRentals = async (userId) => {
  const q = query(
    collection(db, "rentals"),
    where("renterId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
