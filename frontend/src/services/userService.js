import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

// =====================================================
// USER PROFILE
// =====================================================

// Create a user's profile in Firestore
export const createUserProfile = async (uid, userData) => {
  await setDoc(doc(db, "users", uid), {
    ...userData,
    createdAt: new Date(),
  });
};

// Get a user's profile from Firestore
export const getUserProfile = async (uid) => {
  const userDocument = await getDoc(
    doc(db, "users", uid)
  );

  if (userDocument.exists()) {
    return userDocument.data();
  }

  return null;
};

// Update or create a user's profile in Firestore
export const updateUserProfile = async (uid, userData) => {
  await setDoc(
    doc(db, "users", uid),
    userData,
    { merge: true }
  );
};

// =====================================================
// ADDRESSES
// =====================================================

// Get a user's saved addresses
export const getUserAddresses = async (uid) => {
  const userProfile = await getUserProfile(uid);

  return userProfile?.addresses || [];
};

// Save a user's addresses
export const updateUserAddresses = async (uid, addresses) => {
  await updateUserProfile(uid, {
    addresses,
  });
};

// =====================================================
// PAYMENT METHODS
// =====================================================

// Get a user's saved payment methods
export const getUserPayments = async (uid) => {
  const userProfile = await getUserProfile(uid);

  return userProfile?.payments || [];
};

// Save a user's payment methods
export const updateUserPayments = async (uid, payments) => {
  await updateUserProfile(uid, {
    payments,
  });
};

// =====================================================
// LISTS
// =====================================================

// Get a user's saved lists
export const getUserLists = async (uid) => {
  const userProfile = await getUserProfile(uid);

  return userProfile?.lists || [];
};

// Save a user's lists
export const updateUserLists = async (uid, lists) => {
  await updateUserProfile(uid, {
    lists,
  });
};

// =====================================================
// GIFT CARDS
// =====================================================

// Get a user's gift card balance
export const getUserGiftCardBalance = async (uid) => {
  const userProfile = await getUserProfile(uid);

  return userProfile?.giftCardBalance || 0;
};

// Save a user's gift card balance
export const updateUserGiftCardBalance = async (
  uid,
  balance
) => {
  await updateUserProfile(uid, {
    giftCardBalance: balance,
  });
};

// =====================================================
// GIFT CARD ACTIVITY
// =====================================================

// Get a user's gift card activity
export const getUserGiftCardActivity = async (uid) => {
  const userProfile = await getUserProfile(uid);

  return userProfile?.giftCardActivity || [];
};

// Save a user's gift card activity
export const updateUserGiftCardActivity = async (
  uid,
  activity
) => {
  await updateUserProfile(uid, {
    giftCardActivity: activity,
  });
};