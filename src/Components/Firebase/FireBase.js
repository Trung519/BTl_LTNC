//Nơi lưu trữ các hàm để thao tác dữ liệu của FireBase

import { getDatabase, ref, set, remove, push, get, child, onValue } from "firebase/database";
import { useState } from "react";


// Hàm cập nhật dữ liệu
export const updateData = async (data) => {
  const database = getDatabase();
  const newData = {
    name: data.name,
    email: data.email,
    sdt: data.sdt,
    mssv: data.mssv
  };
  await set(ref(database, 'yourCollectionName/' + data.mssv), newData)
};
/*---------------------Hàm thêm data---------------------*/
export const addData = async (data) => {
  const database = getDatabase();
  const dataRef = ref(database, 'Notify/');
  
  const newData = {
    Title: data.title,
    Receiver: data.receiver,
    Content: data.content,
    SentTime: data.sentTime,
    Seen: false
  };

  const snapshot = await get(dataRef); // Lấy dữ liệu từ cơ sở dữ liệu
  const dataCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0; // Đếm số lượng dữ liệu hiện có
  await set(child(ref(database, 'Notify/'), `${dataCount}`), newData); // Thêm dữ liệu mới
};

//--------------------------------------------------------------------

export const deleteData = async (mssv) => {
  const database = getDatabase();
  await remove(ref(database, 'yourCollectionName/' + mssv))
};



/*---------------------Hàm tìm kiếm data---------------------*/

// ---------Hướng dẫn sử dụng hàm tìm kiếm data--------- //
// import React, { useState, useEffect } from "react";
// import { searchDataByMssv } from "./yourUtilityFile";

// function YourComponent() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     searchDataByMssv("yourMssvValue", setData);
//   }, []);

//   return (
//     <div>
//       {/* Your component JSX */}
//     </div>
//   );
// }

// export default YourComponent;

    // ---------------Hàm mẫu--------------- //
export const searchDataByMssv = (mssv, callback) => {
  const database = getDatabase();
  const dataRef = ref(database, 'yourCollectionName/');

  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const user = Object.values(data).find(user => user.mssv === mssv);
      if (user) {
        //Có thể thay đổi hàm callback tùy theo yêu cầu bài toán
        callback({
          name: user.name,
          mssv: user.mssv,
          email: user.email,
          sdt: user.sdt
        });
      } else {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

// ---------------Kết thúc hàm mẫu--------------- //

// export const searchNameDoctor = (name, callback) => {
//   const database = getDatabase();
//   const dataRef = ref(database, 'Employee/Doctor/');

//   onValue(dataRef, (snapshot) => {
//     const data = snapshot.val();
//     if (data) {
//       const doctor = Object.values(data).map(doctor => {
//           const nameDoctor = doctor.FirstName + " " + doctor.LastName;
//           if (nameDoctor.toLowerCase.includes(name.toLowerCase)) {
//             callback(
//             ...listContainString, doctor.id
//             )
//           }
//       });
//     }
//   });
// };





//----------------------------Hàm cho Schedule-----------------------
export const addNewSchedule = async (data, callback) => {
  const database = getDatabase();
  const dataRef = ref(database, 'Schedule/');

  // Lấy dữ liệu hiện có từ Firebase
  const snapshot = await get(dataRef);
  let existingData = snapshot.exists() ? snapshot.val() : {}; // Dữ liệu hiện có
  const newData = {
    Date: data.date,
    ID_doctor: data.id_Doctor,
    Name_doctor: data.name_Doctor,
    Patient: data.name_Patient,
    Room: data.room,
    Status: "Chưa khám",
    Time: data.time
  };

  // Di chuyển dữ liệu hiện có xuống một cấp
  const updatedData = {};
  for (let key in existingData) {
    updatedData[parseInt(key) + 1] = existingData[key];
  }

  // Thêm dữ liệu mới vào vị trí đầu tiên
  updatedData[0] = newData;

  // Ghi dữ liệu mới vào Firebase
  await set(ref(database, 'Schedule/'), updatedData);

  callback({
    id_Doctor: "",
    name_Doctor: "",
    time: "",
    date: "",
    name_Patient: "",
    room: ""
  })
};

export const searchIdDoctorByName = (name, callback) => {
  const database = getDatabase();
  const dataRef = ref(database, 'Employee/Doctor/');

  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const filteredSuggestions = Object.values(data).filter(doctor => {
        const nameDoctor = doctor.FirstName + " " + doctor.LastName;
        return nameDoctor.toLowerCase().includes(name.toLowerCase());
      });
      callback(filteredSuggestions);
    } else {
      callback([]);
    }
  });
};

export const searchNameDoctorByID = (id, callback) => {
  const database = getDatabase();
  const dataRef = ref(database, 'Employee/Doctor');

  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const filteredSuggestions = Object.values(data).filter(doctor => {
        return doctor.ID.includes(id);
      });
      callback(filteredSuggestions);
    } else {
      callback([]);
    }
  });
};

export const setListSchedule = (name, callback) => {
  const database = getDatabase();
  const dataRefSchedule = ref(database, 'Schdule/');

  onValue(dataRefSchedule, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const listSchedule = Object.values(data).filter(schedule => {
        const namePatient = schedule.Patient.FirstName + " " + schedule.Patient.LastName;
        return namePatient.toLowerCase().includes(name.toLowerCase());
      });
      callback(listSchedule);
    } else if (name == ""){
      callback([]);
    }
  });
};

//------------------------Kết thúc hàm cho Schedule------------------