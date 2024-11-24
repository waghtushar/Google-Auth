import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCNSpT-rA6uxRUtTvnYc9XrdinE2hrQNsw",
    authDomain: "fire-storage-a87d4.firebaseapp.com",
    databaseURL: "https://fire-storage-a87d4-default-rtdb.firebaseio.com",
    projectId: "fire-storage-a87d4",
    storageBucket: "fire-storage-a87d4.firebasestorage.app",
    messagingSenderId: "221956044515",
    appId: "1:221956044515:web:0ac977831bb32007c5f7d6"
  };

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { db, auth }