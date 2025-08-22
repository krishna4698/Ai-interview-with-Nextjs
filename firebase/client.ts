// Import the functions you need from the SDKs you need
import { getApp, initializeApp,getApps } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNJXv2B7apzWSLg0XERUkV3Sp1ue4KYtQ",
  authDomain: "aiinterview-75ab3.firebaseapp.com",
  projectId: "aiinterview-75ab3",
  storageBucket: "aiinterview-75ab3.firebasestorage.app",
  messagingSenderId: "631006665829",
  appId: "1:631006665829:web:ab852a48208af74d84ba8c",
  measurementId: "G-HT52KDCZE1"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig):getApp();
export const auth= getAuth(app);
export const db=getFirestore(app);