// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyI2BpMknXBSaZgOlsjId38ZvheRpXZLs",
  authDomain: "btl-ltnc-9c22f.firebaseapp.com",
  projectId: "btl-ltnc-9c22f",
  storageBucket: "btl-ltnc-9c22f.appspot.com",
  messagingSenderId: "157627430613",
  appId: "1:157627430613:web:05f853cf9d86865048945c",
  measurementId: "G-E2N3ZNJR0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);