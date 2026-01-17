import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9IQ-KZyYQ57Cs7BFHmxJZTPl6LWrrkuo",
  authDomain: "level-up-2341e.firebaseapp.com",
  projectId: "level-up-2341e",
  storageBucket: "level-up-2341e.firebasestorage.app",
  messagingSenderId: "1000829505761",
  appId: "1:1000829505761:web:89c9e479191566c49ca7a0",
  measurementId: "G-XHCGC89S6Z"
};

const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Create and name the provider properly
const googleProvider = new GoogleAuthProvider();

// ✅ Export with the same names used in Signup/Login
export { auth, db, googleProvider };
