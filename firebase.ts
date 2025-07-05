// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import modular auth functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeeQwnEbmiw1ZRzt_m-sWCTdy48JeZ1g4",
  authDomain: "iou-capital-one.firebaseapp.com",
  projectId: "iou-capital-one",
  storageBucket: "iou-capital-one.firebasestorage.app",
  messagingSenderId: "526972358568",
  appId: "1:526972358568:web:9a85f2de85cf67103b979d",
  measurementId: "G-YY5T63HLDT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
const auth: Auth = getAuth(app); // Explicitly type the `auth` instance

// Export the auth instance and authentication methods (modular)
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
