// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

console.log("firebase config", {
  apiKey: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_apiKey,
  authDomain: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_authDomain,
  projectId: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_projectId,
  storageBucket: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_storageBucket,
  messagingSenderId:
    process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_appId,
});
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_apiKey,
  authDomain: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_authDomain,
  projectId: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_projectId,
  storageBucket: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_storageBucket,
  messagingSenderId:
    process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_INVENTORY_MANAGEMENT_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
