import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4dUeEO5GyjiOWUKJK2Q7cPfv0McFLras",
  authDomain: "auth-mini.firebaseapp.com",
  projectId: "auth-mini",
  storageBucket: "auth-mini.appspot.com",
  messagingSenderId: "487291698458",
  appId: "1:487291698458:web:52df0e8c38901d0840c0a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)