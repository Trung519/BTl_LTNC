import { getDatabase, ref, get} from "firebase/database";

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

export const GetUserData = async (callback) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Account/');
  
    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let dataUsers = snapshot.exists() ? snapshot.val() : []; // Dữ liệu hiện có
    
    if (callback && typeof callback === 'function') {
        callback(dataUsers);
    }
};