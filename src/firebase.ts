// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Baflh-b96FQP4MXQmD6CL1y-UO_NrTU",
  authDomain: "realtor-6b42c.firebaseapp.com",
  projectId: "realtor-6b42c",
  storageBucket: "realtor-6b42c.appspot.com",
  messagingSenderId: "3961207019",
  appId: "1:3961207019:web:ea530e0ac4abf74f17a6ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
