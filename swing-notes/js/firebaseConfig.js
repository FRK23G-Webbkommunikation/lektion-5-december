// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD42I1MnIwSMuUJDfr5Atp8rrFCccz5UXk",
  authDomain: "swing-notes-7d6b7.firebaseapp.com",
  projectId: "swing-notes-7d6b7",
  storageBucket: "swing-notes-7d6b7.appspot.com",
  messagingSenderId: "437617694205",
  appId: "1:437617694205:web:895afc36eafabfd52db594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }