import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
const db = getDatabase(app);
export { db };
export function AddData_Med(Id_Med, name, origin, HSD, cost, sellPrice, stock) {
  set(ref(db, "Medicine_manage/" + name), {
    medicineID: Id_Med,
    name: name,
    origin: origin,
    HSD: HSD,
    cost: cost,
    sellPrice: sellPrice,
    stock: stock,
  })
    .then(() => {
      // alert("Medicine Added Successfully");
    })
    .catch((error) => {
      alert("Unsuccessful");
      console.error(error);
    });
}
export function UpdateData(Id_Med, name, origin, HSD, cost, sellPrice, stock) {
  update(ref(db, "Medicine_manage/" + name), {
    medicineID: Id_Med,
    name: name,
    origin: origin,
    HSD: HSD,
    cost: cost,
    sellPrice: sellPrice,
    stock: stock,
  })
    .then(() => {
      // alert("Data Updated Successfully");
    })
    .catch((error) => {
      alert("Data Updated Unsuccessful");
      console.log(error);
    });
}
export function DeleteData(name) {
  remove(ref(db, "Medicine_manage/" + name))
    .then(() => {
      // window.location.reload();
      // alert("Data Deleted Successfully");
    })
    .catch((error) => {
      alert("Unsuccessful");
      console.log(error);
    });
}
export const Medicine = async () => {
  const response = await get(child(ref(db), "Medicine_manage/"));
  const posts = await response.val();
  return posts;
};
