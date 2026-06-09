// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVfMQ5gw7qHJGbB_AmmKOL3VqLlfNfDrE",
  authDomain: "kedi-pharmacy.firebaseapp.com",
  projectId: "kedi-pharmacy",
  storageBucket: "kedi-pharmacy.firebasestorage.app",
  messagingSenderId: "113444919872",
  appId: "1:113444919872:web:3d25cd7341902d6f0ddda5",
  measurementId: "G-CJM97JTG3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Expose globally for HTML scripts
window.AuraFirebase = {
  app,
  analytics,
  auth,
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  updateProfile
};

// Active Authentication State Synchronization Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userData = {
      id: user.uid,
      name: user.displayName || user.email.split('@')[0].toUpperCase(),
      email: user.email,
      role: 'consultant'
    };
    
    // Set/Sync all session keys
    if (!localStorage.getItem('kedi_user_session') || !localStorage.getItem('aura_user')) {
      localStorage.setItem('kedi_user', JSON.stringify(userData));
      localStorage.setItem('aura_user', JSON.stringify(userData));
      localStorage.setItem('kedi_user_session', JSON.stringify(userData));
      localStorage.setItem('kedi_token', user.accessToken || 'firebase-token');
      console.log("Firebase auth session synchronized to localStorage.");
    }
  } else {
    // If not authenticated in Firebase, ensure all localStorage sessions are cleared
    if (localStorage.getItem('kedi_user_session') || localStorage.getItem('kedi_user') || localStorage.getItem('aura_user')) {
      localStorage.removeItem('kedi_user');
      localStorage.removeItem('aura_user');
      localStorage.removeItem('kedi_user_session');
      localStorage.removeItem('kedi_token');
      console.log("LocalStorage sessions cleared to match Firebase sign-out state.");
    }
  }
});

console.log("Firebase initialized and Auth module exported successfully.");
