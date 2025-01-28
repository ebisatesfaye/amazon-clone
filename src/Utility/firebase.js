// Import only the necessary Firebase services
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

import "firebase/compat/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu2pcLyKJ0YsZEjBiN8H0JNacvj2e3IAE",
  authDomain: "clone-b74d3.firebaseapp.com",
  projectId: "clone-b74d3",
  storageBucket: "clone-b74d3.firebasestorage.app",
  messagingSenderId: "150849544373",
  appId: "1:150849544373:web:46a75b58e4c85468c69efc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
