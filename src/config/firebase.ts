// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQIuBnpUKZQy7i4BL0zYVdTOG-CbhXTfU",
  authDomain: "react-project-e5b92.firebaseapp.com",
  projectId: "react-project-e5b92",
  storageBucket: "react-project-e5b92.appspot.com",
  messagingSenderId: "388297904357",
  appId: "1:388297904357:web:ce0dba7a1a751052e3c40c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);