import { getDatabase, ref, get, set } from "firebase/database";

const updateWhenRemove = async (listRemove) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Schedule');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let listSchedule = snapshot.exists() ? snapshot.val() : []; // Dữ liệu hiện có

    // Di chuyển dữ liệu hiện có xuống một cấp
    const newList = listSchedule.filter(schedule => {
        return !listRemove.find(item => item.id_schedule === schedule.id_schedule)
    })

    //Ghi dữ liệu mới vào Firebase
    await set(ref(database, 'Schedule'), newList);
};

export default updateWhenRemove;
