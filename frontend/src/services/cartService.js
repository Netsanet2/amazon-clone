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

// Add a product to the current user's cart
export const addCartItem = async (product) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  if (!product?.id) {
    throw new Error("Product ID is required");
  }

  const productId = String(product.id);

  const cartItemRef = doc(
    db,
    "carts",
    user.uid,
    "items",
    productId
  );

  const cartItem = {
    ...product,
    id: productId,
    productId,
    quantity: Number(product.quantity) || 1,
  };

  await setDoc(cartItemRef, cartItem);

  return cartItem;
};


// Get all cart items for the current user
export const getCartItems = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const cartRef = collection(
    db,
    "carts",
    user.uid,
    "items"
  );

  const snapshot = await getDocs(cartRef);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      ...data,
      id: String(document.id),
      productId: String(data.productId ?? document.id),
      quantity: Number(data.quantity) || 1,
    };
  });
};


// Update a cart item
export const updateCartItem = async (productId, updates) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  if (!productId) {
    throw new Error("Product ID is required");
  }

  const normalizedProductId = String(productId);

  const cartItemRef = doc(
    db,
    "carts",
    user.uid,
    "items",
    normalizedProductId
  );

  await updateDoc(cartItemRef, updates);
};

// Remove one item from the current user's cart
export const deleteCartItem = async (productId) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const normalizedProductId = String(productId);

  const cartItemRef = doc(
    db,
    "carts",
    user.uid,
    "items",
    normalizedProductId
  );

  await deleteDoc(cartItemRef);
};

// Remove all items from the current user's cart
export const clearCart = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const cartRef = collection(db, "carts", user.uid, "items");
  const snapshot = await getDocs(cartRef);
  const batch = writeBatch(db);

  snapshot.docs.forEach((document) => {
    batch.delete(document.ref);
  });

  await batch.commit();
};