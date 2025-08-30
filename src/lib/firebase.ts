import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDN3iiVX4O0QTR6VG8SuGPxzWeol2xI634",
  authDomain: "studynest-e393f.firebaseapp.com",
  projectId: "studynest-e393f",
  storageBucket: "studynest-e393f.appspot.com",
  messagingSenderId: "467497517477",
  appId: "1:467497517477:web:dd13178904f1c934a4284c",
  measurementId: "G-J0R0PYJRZ6"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only in the browser
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  try {
    getAnalytics(app);
  } catch (error) {
    console.error("Failed to initialize Analytics", error);
  }
}


export { app, auth, db };
