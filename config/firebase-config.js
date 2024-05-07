import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

export const firebaseConfig = {
  apiKey: "AIzaSyAocXtMQCtr_u_fZvJ2Nee7VBwRPD0Dg-U",
  authDomain: "bwi-shein.firebaseapp.com",
  projectId: "bwi-shein",
  storageBucket: "bwi-shein.appspot.com",
  messagingSenderId: "876688672852",
  appId: "1:876688672852:web:330ceb480d0aa9739d85c1",
  measurementId: "G-1KDLLJZXQ9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
