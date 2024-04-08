// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, child, get, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHfpl2Vsr7GGd8Sb6VAdNRLWKEdE9M_MI",
  authDomain: "project1-33ba1.firebaseapp.com",
  databaseURL: "https://project1-33ba1-default-rtdb.firebaseio.com",
  projectId: "project1-33ba1",
  storageBucket: "project1-33ba1.appspot.com",
  messagingSenderId: "122408221984",
  appId: "1:122408221984:web:8d1f8ed3c54f8cc7acab45",
  measurementId: "G-W41PD0H5PY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

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
