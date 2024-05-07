// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  remove,
  onValue
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
const analytics = getAnalytics(app);
const db = getDatabase(app);
const dbRef = ref(db);
export function AddData(fullName, birthDay, newGender, CCCD, BHYT, address) {
  set(ref(db, "PatientRecord/" + CCCD), {
    fullName: fullName,
    birthDay: birthDay,
    gender: newGender,
    CCCD: CCCD,
    BHYT: BHYT,
    address: address || "",
    // history: [{ a: "a" }],
  })
    .then(() => {
      // alert("Data Added Successfully");
    })
    .catch((error) => {
      alert("Unsuccessful");
      console.error(error);
    });
}
//K. sửa hàm AddHist //Update để truy cập tham chiếu mảng khác
// histIndex để truy xuất?
export function AddHist(CCCD, newHistory) {
  const patientRef = ref(db, "PatientRecord/" + CCCD);
  get(patientRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let patientData = snapshot.val();
        if (!patientData.history) {
          patientData.history = [];
        }
        patientData = {
          ...patientData,
          history: [...patientData.history, newHistory],
        };

        // Lấy danh sách thuốc từ lịch sử mới thêm
        const drugs = newHistory.medicineList;

        // Lặp qua từng loại thuốc
        drugs.forEach((drug) => {
          const drugName = drug.medicine;
          console.log("drugName", drugName);
          const quantity = drug.unit;
          console.log("quantity", quantity);

          // Truy cập vào thông tin thuốc từ bảng Medicine
          const medicineRef = ref(db, "Medicine_manage/" + drugName);
          get(medicineRef)
            .then((medicineSnapshot) => {
              if (medicineSnapshot.exists()) {
                let medicineData = medicineSnapshot.val();
                // Giảm số lượng tồn kho
                medicineData.stock -= quantity;
                // Cập nhật lại thông tin thuốc trong bảng Medicine
                update(medicineRef, medicineData);
              } else {
                alert("Medicine not found: " + drugName);
              }
            })
            .catch((error) => {
              console.error("Error fetching medicine data:", error);
            });
        });

        // Cập nhật lại thông tin bệnh nhân trong bảng PatientRecord
        update(patientRef, patientData)
          .then(() => {
            // alert("History Added Successfully");
          })
          .catch((error) => {
            alert("Unsuccessful");
            console.error("Error updating patient record:", error);
          });
      } else {
        alert("Patient Record not found");
      }
    })
    .catch((error) => {
      alert("Error fetching patient record");
      console.error("Error fetching patient record:", error);
    });
}
export function getMedCheck(CCCD, index, pharmacist) {
  const historyRef = ref(db, "PatientRecord/" + CCCD + "/history/" + index);
  console.log(historyRef);
  get(historyRef)
    .then((snapshot) => {
      let historyData = snapshot.val();
      historyData = {
        ...historyData,
        getMed: true,
        pharmacist: pharmacist
      };
      update(historyRef, historyData)
        .then(() => {
          // alert("History Added Successfully");
        })
        .catch((error) => {
          alert("Unsuccessful");
          console.error("Error updating patient record:", error);
        });
    })
    .catch((error) => {
      alert("Error fetching patient record");
      console.error("Error fetching patient record:", error);
    });
}

export function Add_Med(CCCD, histIndex, medicine, usage, dosagePerDay, unit) {
  const patientRef = ref(db, "PatientRecord/" + CCCD);
  get(patientRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const patientData = snapshot.val();
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
            // alert("Medicine Added Successfully");
          })
          .catch((error) => {
            alert("Unsuccessful");
            console.error(error);
          });
      } else {
        alert("Patient Record not found");
      }
    })
    .catch((error) => {
      alert("Error fetching patient record");
      console.error(error);
    });
}

export const Patients = async () => {
  const database = getDatabase();
  const dataRef = ref(database, 'PatientRecord/');

  return new Promise((resolve, reject) => {
    onValue(dataRef, (snapshot) => {
      const record = snapshot.val();
      const listRecord = [];

      if (record) {
        Object.keys(record).forEach(key => {
          listRecord.push(record[key]);
        });
      }

      resolve(listRecord);
    }, (error) => {
      reject(error);
    });
  });
};



export function UpdateData(fullName, birthDay, newGender, CCCD, BHYT) {
  update(ref(db, "PatientRecord/" + CCCD), {
    fullName: fullName,
    birthDay: birthDay.toString(),
    gender: newGender,
    CCCD: CCCD,
    BHYT: BHYT,
  })
    .then(() => {
      // alert("Data Updated Successfully");
    })
    .catch((error) => {
      alert("Data Updated Unsuccessful");
      console.log(error);
    });
}
export function DeleteData(CCCD) {
  remove(ref(db, "PatientRecord/" + CCCD))
    .then(() => {
      // window.location.reload();
      // alert("Data Deleted Successfully");
    })
    .catch((error) => {
      alert("Unsuccessful");
      console.log(error);
    });
}
