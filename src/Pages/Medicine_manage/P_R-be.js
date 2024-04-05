import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {
    getDatabase,
    ref,
    child,
    get,
    set,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCyI2BpMknXBSaZgOlsjId38ZvheRpXZLs",
    authDomain: "btl-ltnc-9c22f.firebaseapp.com",
    databaseURL: "https://btl-ltnc-9c22f-default-rtdb.firebaseio.com",
    projectId: "btl-ltnc-9c22f",
    storageBucket: "btl-ltnc-9c22f.appspot.com",
    messagingSenderId: "157627430613",
    appId: "1:157627430613:web:5248f93026848e6848945c",
    measurementId: "G-WYRWK424BJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
export { db };
export function AddData_Med(Id_Med, name, origin, HSD, cost, sellPrice, stock) {
    set(ref(db, 'Medicine_manage/' + Id_Med), {
        ID: Id_Med,
        name: name,
        origin: origin,
        HSD: HSD,
        cost: cost,
        sellPrice: sellPrice,
        stock: stock,
    })
        .then(() => {
            alert("Data Added Successfully");
        })
        .catch((error) => {
            alert("Unsuccessful");
            console.error(error);
        });
};