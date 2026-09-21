import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

import { db, auth } from "../firebase";
export const addCartItem = async (product) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const cartItemRef = doc(
    db,
    "carts",
    user.uid,
    "items",
    String(product.id)
  );

  await setDoc(cartItemRef, {
    ...product,
    productId: product.id,
  });

  return product;
};
export const getCartItems = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const cartRef = collection(db, "carts", user.uid, "items");
  const snapshot = await getDocs(cartRef);

  return snapshot.docs.map((doc) => doc.data());
};
export const updateCartItem = async (productId, updates) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const cartItemRef = doc(
    db,
    "carts",
    user.uid,
    "items",
    String(productId)
  );

  await updateDoc(cartItemRef, updates);
};
export const deleteCartItem = async (productId) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const cartItemRef = doc(
    db,
    "carts",
    user.uid,
    "items",
    String(productId)
  );

  await deleteDoc(cartItemRef);
};
export const clearCart = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const cartRef = collection(db, "carts", user.uid, "items");
  const snapshot = await getDocs(cartRef);

  const batch = writeBatch(db);

  snapshot.docs.forEach((item) => {
    batch.delete(item.ref);
  });

  await batch.commit();
};