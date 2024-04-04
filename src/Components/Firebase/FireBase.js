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

/*---------------------Bắt đầu các hàm tìm kiếm data---------------------*/
export const searchIdDoctorByName = (name, callback) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Employee/Doctor/');

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const doctor = Object.values(data).find(doctor => {
            const nameDoctor = doctor.FirstName + " " + doctor.LastName;
            return nameDoctor.toLowerCase().includes(name.toLowerCase());
        });
        if (doctor) {
          callback({
            id: doctor.ID,
            name: doctor.FirstName + " " + doctor.LastName
          });
        }
      }
    });
};
/*---------------------Kết thúc các hàm tìm kiếm data---------------------*/



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





