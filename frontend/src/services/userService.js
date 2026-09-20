import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import app from "../firebase";

const db = getFirestore(app);

// Create or update a user's profile in Firestore
export const createUserProfile = async (uid, userData) => {
  await setDoc(doc(db, "users", uid), {
    ...userData,
    createdAt: new Date(),
  });
};

// Get a user's profile from Firestore
export const getUserProfile = async (uid) => {
  const userDocument = await getDoc(doc(db, "users", uid));

  if (userDocument.exists()) {
    return userDocument.data();
  }

  return null;
};
// Update a user's profile in Firestore
export const updateUserProfile = async (uid, userData) => {
  await updateDoc(doc(db, "users", uid), userData);
};