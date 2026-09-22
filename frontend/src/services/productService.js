import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const productsCollection = collection(db, "products");

// Get all products
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};

// Get one product by ID
export const getProductById = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product.");
  }
};

// Add a product
export const addProduct = async (product) => {
  try {
    const document = await addDoc(productsCollection, product);

    return {
      id: document.id,
      ...product,
    };
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product.");
  }
};

// Update a product
export const updateProduct = async (id, product) => {
  try {
    const productRef = doc(db, "products", id);

    await updateDoc(productRef, product);

    return {
      id,
      ...product,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product.");
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, "products", id);

    await deleteDoc(productRef);

    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
};