import { getDatabase, ref, get, set } from "firebase/database";

const Updatewhenedit = async (item) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Schedule');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let listSchedule = snapshot.exists() ? snapshot.val() : []; // Dữ liệu hiện có

    listSchedule = listSchedule.map(schedule => {
        if (schedule.id_schedule === item.id_schedule) {
            return item;
        } else {
            return schedule;
        }
    });
    
    //Ghi dữ liệu mới vào Firebase
    await set(ref(database, 'Schedule'), listSchedule);
};

export default Updatewhenedit;
