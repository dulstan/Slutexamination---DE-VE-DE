// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvJbeLltrR_-VLBS2O0Suvm6EdE6J0OBU",
  authDomain: "de-ve-de-9f88e.firebaseapp.com",
  projectId: "de-ve-de-9f88e",
  storageBucket: "de-ve-de-9f88e.appspot.com",
  messagingSenderId: "169892086536",
  appId: "1:169892086536:web:baaf18eb103115eaa462bd",
  measurementId: "G-31219G2HKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);