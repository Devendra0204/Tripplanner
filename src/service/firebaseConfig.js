// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3igFIR_7SknlmcBzvwT79Qq_gII4EuHg",
    authDomain: "tripplanner-c696b.firebaseapp.com",
    projectId: "tripplanner-c696b",
    storageBucket: "tripplanner-c696b.firebasestorage.app",
    messagingSenderId: "917856340035",
    appId: "1:917856340035:web:32359134197e9da4e2acf6",
    measurementId: "G-H93XMBQQDS"
};

// Initialize Firebase>
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)