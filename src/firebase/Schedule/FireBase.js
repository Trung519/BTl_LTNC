//Nơi lưu trữ các hàm để thao tác dữ liệu của FireBase

import { getDatabase, ref, set, remove, push, get, child, onValue } from "firebase/database";
import RandomKey from "../RandomKey.js";

//----------------------------Hàm cho Schedule-----------------------
export const addNewSchedule = async (data, callback) => {
  const database = getDatabase();
  const dataRef = ref(database, 'Schedule/');

  // Lấy dữ liệu hiện có từ Firebase
  const snapshot = await get(dataRef);
  let existingData = snapshot.exists() ? snapshot.val() : {}; // Dữ liệu hiện có
  const newData = {
    id_schedule: RandomKey(),
    Date: data.date,
    ID_doctor: data.id_Doctor,
    Name_doctor: data.name_Doctor,
    Patient: data.name_Patient,
    CCCD: data.name_CCCD,
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

export const searchIdDoctorByName = (user, name, callback = () => {
  console.log("ERROR in searchIdDoctorByName");
}) => {
  const database = getDatabase();
  const dataRef = ref(database, 'Employee/');

  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      if (data === "") {
        if (user.typeEmp === "Quản trị") callback(data);
        else {
          const filteredSuggestions = Object.values(data).filter(doctor => {
            return user.department === doctor.Department;
          });
          console.log(filteredSuggestions, "dasda");
          callback(filteredSuggestions);
        }
      }
      else if (user.typeEmp === "Quản trị") {
        const filteredSuggestions = Object.values(data).filter(doctor => {
          const nameDoctor = doctor.FirstName + " " + doctor.LastName;
          return nameDoctor.toLowerCase().includes(name.toLowerCase());
        });
        callback(filteredSuggestions);
      }
      else {
        const filteredSuggestions = Object.values(data).filter(doctor => {
          const nameDoctor = doctor.FirstName + " " + doctor.LastName;
          return user.department === doctor.Department && nameDoctor.toLowerCase().includes(name.toLowerCase());
        });
        callback(filteredSuggestions);
      }
    } else {
      callback([]);
    }
  });
};

export const searchNameDoctorByID = (user, id, callback = () => {
  console.log("ERROR in searchNameDoctorByID");
}) => {
  const database = getDatabase();
  const dataRef = ref(database, 'Employee/');

  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      if (id === "") {
        if (user.typeEmp === "Quản trị") callback(data);
        else {
          const filteredSuggestions = Object.values(data).filter(doctor => {
            return user.department === doctor.Department;
          });
          callback(filteredSuggestions);
        }
      }
      else if (user.typeEmp === "Quản trị") {
        const filteredSuggestions = Object.values(data).filter(doctor => {
          return doctor.ID.toLowerCase().includes(id.toLowerCase());
        });
        callback(filteredSuggestions);
      }
      else {
        const filteredSuggestions = Object.values(data).filter(doctor => {
          return user.department === doctor.Department && doctor.ID.includes(id);
        });
        callback(filteredSuggestions);
      }
    } else {
      callback([]);
    }
  });
};

const isSameDepartment = (typeDepartment, id = -1) => {
  const database = getDatabase();
  const dataRefSchedule = ref(database, 'Employee/');

  onValue(dataRefSchedule, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const listEmployee = Object.values(data).filter(employee => {
        if (employee.Department === typeDepartment) {
          if (id === -1) return true;
          else return employee.ID === id;
        }
      });

      return listEmployee;
    }
    else {
      console.log("Error in isSameDepartment!")
    }
  });
};

export const setListSchedule = (user, name, callback = () => {
  console.log("ERROR in setListSchedule");
}) => {
  const database = getDatabase();
  const dataRefSchedule = ref(database, 'Schedule/');

  onValue(dataRefSchedule, (snapshot) => {
    const data = snapshot.val();
    if (data && name === "") {
      const listSchedule = Object.values(data).filter(schedule => {
        if (user.typeEmp === "Bác sỹ") return schedule.ID_doctor === user.id;
        else if (user.typeEmp === "Quản trị") return true;
        else {
          return isSameDepartment(user.department);
        }
      });
      callback(listSchedule);
    }
    else if (data && user.typeEmp === "Quản trị") {
      const listSchedule = Object.values(data).filter(schedule => {
        const namePatient = schedule.Patient;
        return namePatient.toLowerCase().includes(name.toLowerCase());
      });
      callback(listSchedule);
    }
    else if (data && user.typeEmp === "Bác sỹ") {
      const listSchedule = Object.values(data).filter(schedule => {
        const namePatient = schedule.Patient;
        return namePatient.toLowerCase().includes(name.toLowerCase()) && schedule.ID_doctor === user.id;
      });
      callback(listSchedule);
    }
    else if (data && user.typeEmp !== "Bác sỹ") {
      const listSchedule = Object.values(data).filter(schedule => {
        const namePatient = schedule.Patient;
        return namePatient.toLowerCase().includes(name.toLowerCase()) && isSameDepartment(user.department, schedule.ID_doctor);
      });
      callback(listSchedule);
    }
    else {
      callback([]);
    }
  });
};

//------------------------Kết thúc hàm cho Schedule------------------