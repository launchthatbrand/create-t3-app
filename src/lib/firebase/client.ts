// Import the functions you need from the SDKs you need

import { getApp, getApps, initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCng1sWElHzTYlf-kQpTcrxoWbRYdmVNVQ",
  authDomain: "create-t3-app-ad5e0.firebaseapp.com",
  projectId: "create-t3-app-ad5e0",
  storageBucket: "create-t3-app-ad5e0.appspot.com",
  messagingSenderId: "702033397334",
  appId: "1:702033397334:web:20120d230a13d4645c9df7",
  measurementId: "G-RTL59ZGSJV",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
