// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp-8PhgGvE0v29iIfWQFIgj9BthQBhkM0",
  authDomain: "firstproject-43c1a.firebaseapp.com",
  projectId: "firstproject-43c1a",
  storageBucket: "firstproject-43c1a.firebasestorage.app",
  messagingSenderId: "330311120600",
  appId: "1:330311120600:web:38bbf3e8bdd9d5479e89ad",
  measurementId: "G-3L28JC377D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Export
export { db, analytics };
export default app;
