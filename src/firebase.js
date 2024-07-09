// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "finsta-social-media-app-72fa0.firebaseapp.com",
  projectId: "finsta-social-media-app-72fa0",
  storageBucket: "finsta-social-media-app-72fa0.appspot.com",
  messagingSenderId: "615582334836",
  appId: "1:615582334836:web:4d5177381864e888c2f621",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
