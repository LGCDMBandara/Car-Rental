import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm6q2Vv2nErzd3UOl4Z-nhw-VL8i8uQUE",
  authDomain: "carrentalapp-3327f.firebaseapp.com",
  projectId: "carrentalapp-3327f",
  storageBucket: "carrentalapp-3327f.firebasestorage.app",
  messagingSenderId: "22558576260",
  appId: "1:22558576260:web:023cfcc554550925a27cd1",
  measurementId: "G-FMFY3K6XFP",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
