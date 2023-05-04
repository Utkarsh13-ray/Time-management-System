// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7rey0ugmgffO2GuM-v6JhXlUwBZsR0ik",
  authDomain: "time-managment-system-9b79b.firebaseapp.com",
  projectId: "time-managment-system-9b79b",
  storageBucket: "time-managment-system-9b79b.appspot.com",
  messagingSenderId: "183199729244",
  appId: "1:183199729244:web:a45b4068fc09666a540899",
  measurementId: "G-3LWHE4HZBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth(app)