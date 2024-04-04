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
export { db };
export function AddData(fullName, birthDay, newGender, CCCD, BHYT) {
    set(ref(db, 'PatientRecord/' + CCCD), {
        CCCD: {
            fullName: fullName,
            birthDay: birthDay.toString(),
            gender: newGender,
            CCCD: CCCD,
            BHYT: BHYT,
        },
    })
        .then(() => {
            alert("Data Added Successfully");
        })
        .catch((error) => {
            alert("Unsuccessful");
            console.error(error);
        });
};
export function AddHist(CCCD,date, doctor, disease) {
    const patientRef = ref(db, 'PatientRecord/' + CCCD);
    get(patientRef).then((snapshot) => {
        if (snapshot.exists()) {
            const patientData = snapshot.val();
            const newHistory = {
                date: date,
                doctor: doctor,
                disease: disease
            };
            if (!patientData.Hist) {
                patientData.Hist = [newHistory];
            } else {
                patientData.Hist.push(newHistory);
            }
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
export function Add_Med(CCCD,medicine,usage, dosagePerDay, unit) {
    const patientRef = ref(db, 'PatientRecord/' + CCCD);
    get(patientRef).then((snapshot) => {
        if (snapshot.exists()) {
            const patientData = snapshot.val();
            const newMed = {
                medicine: medicine,
                usage: usage,
                dosagePerDay: dosagePerDay,
                unit:unit,
            };
            if (!patientData.Med) {
                patientData.Med = [newMed];
            } else {
                patientData.Med.push(newMed);
            }
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

export const Patients = () => {
    return new Promise((resolve, reject) => {
        get(ref(db, 'PatientRecord/'))
            .then(response => {
                const posts = response.val();
                resolve(posts);
            })
            .catch(error => {
                reject(error);
            });
    });
};
