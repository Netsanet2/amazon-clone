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

  const quantity = Number(product.quantity);

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error(
      "Cart quantity must be a positive integer"
    );
  }

  const cartItem = {
    id: productId,
    productId,
    name: product.name,
    price: Number(product.price),
    image: product.image,
    quantity,
  };

  if (
    !cartItem.name ||
    !Number.isFinite(cartItem.price) ||
    !cartItem.image
  ) {
    throw new Error(
      "Cart item is missing required product fields"
    );
  }

  await setDoc(cartItemRef, cartItem);

  return cartItem;
};

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
      productId: String(
        data.productId ?? document.id
      ),
      quantity: Number(data.quantity) || 1,
    };
  });
};

export const updateCartItem = async (
  productId,
  updates
) => {
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

export const clearCart = async () => {
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

  const batch = writeBatch(db);

  snapshot.docs.forEach((document) => {
    batch.delete(document.ref);
  });

  await batch.commit();
};