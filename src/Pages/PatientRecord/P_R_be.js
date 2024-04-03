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
import { render } from "@testing-library/react";
import PatientRecord from "./PatientRecord";
import { useEffect, useState } from "react";
import { Row } from "./PatientRecord";
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
                disease: disease,
                medicalList: {},
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

export function Table_Body() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const dbRef = ref(db, 'PatientRecord/');
        onValue(dbRef, (snapshot) => {
            let record = [];
            snapshot.forEach((childsnapshoot) => {
                let keyname = childsnapshoot.key;
                let data = childsnapshoot.val();
                record.push({ key: keyname, data: data });
            });
            setTableData(record);
        });
    }, []);

    return (
        tableData.map((rowdata) => rowdata.data.CCCD)
    );
}

