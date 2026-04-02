'use client';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
 
// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyDn0NTBUFk1xy-bIYSbZZQaHrecttFE5Oc",
  authDomain: "finanncetracker.firebaseapp.com",
  projectId: "finanncetracker",
  storageBucket: "finanncetracker.firebasestorage.app",
  messagingSenderId: "740971271840",
  appId: "1:740971271840:web:e8ff4145a78a323f8adbc5"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);