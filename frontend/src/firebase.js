import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCx_AEZ9F7gRYp96l5gDf0iKWkRhOgEo5E",
  authDomain: "clone-764ac.firebaseapp.com",
  projectId: "clone-764ac",
  storageBucket: "clone-764ac.firebasestorage.app",
  messagingSenderId: "174865523292",
  appId: "1:174865523292:web:e6f25bd852101ad324fc99"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
