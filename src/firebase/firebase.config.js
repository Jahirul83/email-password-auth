// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM0zEsNpXQ1CMr295zMQM3BmgqXOUcN2k",
  authDomain: "user-email-password-auth-1f77a.firebaseapp.com",
  projectId: "user-email-password-auth-1f77a",
  storageBucket: "user-email-password-auth-1f77a.appspot.com",
  messagingSenderId: "635605587399",
  appId: "1:635605587399:web:570826aa32ea739b14f5e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;