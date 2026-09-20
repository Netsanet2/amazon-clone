import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  getAuth,
} from "firebase/auth";

import app from "../firebase";
import { createUserProfile } from "./userService";

const auth = getAuth(app);

// Register a new user
export const registerUser = async (name, email, password) => {
  // 1. Create the authentication account
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  

  // 2. Add the user's name to Firebase Authentication
  await updateProfile(result.user, {
    displayName: name,
  });

  // 3. Save the user's profile in Firestore
  await createUserProfile(result.user.uid, {
    name: name,
    email: email,
    phone: "",
  });

  return result;
};

// Login an existing user
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout the current user
export const logoutUser = () => {
  return signOut(auth);
};

// Send password reset email
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};