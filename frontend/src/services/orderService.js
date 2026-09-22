import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const ORDERS_COLLECTION = "orders";

// Create a new order in Firestore
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(
      collection(db, ORDERS_COLLECTION),
      {
        ...orderData,
        status: "Processing",
        createdAt: serverTimestamp(),
      }
    );

    return {
      id: docRef.id,
      ...orderData,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get all orders belonging to the logged-in user
export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    const orders = querySnapshot.docs.map((orderDocument) => {
      const data = orderDocument.data();

      return {
        id: orderDocument.id,
        ...data,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : null,
      };
    });

    // Sort locally so loading orders does not require a Firestore composite index.
    return orders.sort((firstOrder, secondOrder) => {
      const firstDate = firstOrder.createdAt
        ? new Date(firstOrder.createdAt).getTime()
        : 0;
      const secondDate = secondOrder.createdAt
        ? new Date(secondOrder.createdAt).getTime()
        : 0;

      return secondDate - firstDate;
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

// Get one order by its ID
export const getOrderById = async (orderId) => {
  try {
    const orderDocument = await getDoc(
      doc(db, ORDERS_COLLECTION, orderId)
    );

    if (!orderDocument.exists()) {
      return null;
    }

    const data = orderDocument.data();

    return {
      id: orderDocument.id,
      ...data,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : null,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};