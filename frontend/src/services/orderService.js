import { 
  db, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from '../firebase/config'; // Adjust to match your firebase import path

const ORDERS_COLLECTION = 'orders';

// Save new order to Firestore
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...orderData,
      status: 'Processing',
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...orderData };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Fetch order history for logged-in user
export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate().toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};