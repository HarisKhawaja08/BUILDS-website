import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ─────────────────────────────────────────────────────────────────
// PASTE YOUR CONFIG HERE.
// Firebase Console → Project settings (gear icon) → General tab →
// "Your apps" → the web app you registered → SDK setup and
// configuration → "Config" radio button. Copy the whole object in
// and replace everything below.
//
// These values are safe to commit/share — they identify your project,
// they are not secret keys. Access is controlled by the Firestore
// rules you pasted in, not by hiding this object.
// ─────────────────────────────────────────────────────────────────
const firebaseConfig = {
 apiKey: "AIzaSyDNavRKONAgHAr1IP2aie5jjTtJ6w_TSKg",
  authDomain: "builds-website.firebaseapp.com",
  projectId: "builds-website",
  storageBucket: "builds-website.firebasestorage.app",
  messagingSenderId: "445748233950",
  appId: "1:445748233950:web:793a58560dd0f93c1ba44f"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
