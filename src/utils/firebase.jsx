// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC657Ih1Ne782FW6d5dUAUBYmcK6hl8OH0",
  authDomain: "movienest-7063b.firebaseapp.com",
  projectId: "movienest-7063b",
  storageBucket: "movienest-7063b.firebasestorage.app",
  messagingSenderId: "294027696797",
  appId: "1:294027696797:web:516831e450e7c0962a1274",
  measurementId: "G-L2DL35PZEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();