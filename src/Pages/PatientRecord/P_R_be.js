// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { TableBody, TableCell, TableContainer, Table, TableHead, TableRow, Paper } from '@mui/material';
import { onValue } from 'firebase/database';
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
const dbRef = ref(db);
export function AddData(fullName, birthDay, newGender, CCCD, BHYT) {
    set(ref(db, 'PatientRecord/' + CCCD), {
        fullName: fullName,
        birthDay: birthDay.toString(),
        gender: newGender,
        CCCD: CCCD,
        BHYT: BHYT,
    })
        .then(() => {
            alert("Data Added Successfully");
        })
        .catch((error) => {
            alert("Unsuccessful");
            console.error(error);
        });
};
export function AddHist(CCCD, histIndex, date, doctor, disease) {
    const patientRef = ref(db, 'PatientRecord/' + CCCD);
    get(patientRef).then((snapshot) => {
        if (snapshot.exists()) {
            const patientData = snapshot.val();
            
            // Kiểm tra xem Hist có tồn tại không
            if (!patientData.Hist || !patientData.Hist[histIndex]) {
                // Nếu Hist không tồn tại hoặc Hist tại histIndex không tồn tại, tạo Hist mới
                patientData.Hist = patientData.Hist || [];
                patientData.Hist[histIndex] = {};
            }

            patientData.Hist[histIndex].date = date;
            patientData.Hist[histIndex].doctor = doctor;
            patientData.Hist[histIndex].disease = disease;

            update(patientRef, patientData)
                .then(() => {
                    alert("History Added Successfully");
                })
                .catch((error) => {
                    alert("Unsuccessful");
                    console.error(error);
                });
        } else {
            alert("Patient Record not found");
        }
    }).catch((error) => {
        alert("Error fetching patient record");
        console.error(error);
    });
};


export function Add_Med(CCCD, histIndex, medicine, usage, dosagePerDay, unit) {
    const patientRef = ref(db, 'PatientRecord/' + CCCD);
    get(patientRef).then((snapshot) => {
        if (snapshot.exists()) {
            const patientData = snapshot.val();
            if (!patientData.Hist || !patientData.Hist[histIndex]) {
                patientData.Hist = patientData.Hist || [];
                patientData.Hist[histIndex] = { Med: [] };
            }
            const hist = patientData.Hist[histIndex];
            const newMed = {
                medicine: medicine,
                usage: usage,
                dosagePerDay: dosagePerDay,
                unit: unit,
            };

            // Kiểm tra xem Hist đã chứa mảng Med chưa
            if (!hist.Med) {
                // Nếu Hist không chứa mảng Med, tạo mảng Med mới và thêm thuốc vào đó
                hist.Med = [newMed];
            } else {
                // Nếu Hist đã chứa mảng Med, thêm thuốc vào mảng Med
                hist.Med.push(newMed);
            }
            
            update(patientRef, patientData)
                .then(() => {
                    alert("Medicine Added Successfully");
                })
                .catch((error) => {
                    alert("Unsuccessful");
                    console.error(error);
                });
        } else {
            alert("Patient Record not found");
        }
    }).catch((error) => {
        alert("Error fetching patient record");
        console.error(error);
    });
};



export const Patients = async () => {
    const response = await get(child(dbRef, "PatientRecord/"));
    const posts = await response.val();
    return posts;
};

export const getPatients = async (callback) => {
    const response = await get(child(dbRef, "PatientRecord/"));
    const posts = await response.val();
    callback(posts)
};