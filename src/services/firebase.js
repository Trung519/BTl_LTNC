// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, child, get, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyI2BpMknXBSaZgOlsjId38ZvheRpXZLs",
  authDomain: "btl-ltnc-9c22f.firebaseapp.com",
  databaseURL: "https://btl-ltnc-9c22f-default-rtdb.firebaseio.com",
  projectId: "btl-ltnc-9c22f",
  storageBucket: "btl-ltnc-9c22f.appspot.com",
  messagingSenderId: "157627430613",
  appId: "1:157627430613:web:5248f93026848e6848945c",
  measurementId: "G-WYRWK424BJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

const dbRef = ref(database);

export const getData = async () => {
  const response = await get(child(dbRef, "/"));
  const posts = await response.val();
  return posts;
};

// get(child(dbRef, "/"))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

export function writeUserData(data, path) {
  set(child(dbRef, path), {
    ...data,
  });
}
