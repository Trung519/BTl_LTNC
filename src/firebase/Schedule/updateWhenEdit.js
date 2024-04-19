import { getDatabase, ref, get, set } from "firebase/database";

const Updatewhenedit = async (listEdit) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Schedule');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let listSchedule = snapshot.exists() ? snapshot.val() : []; // Dữ liệu hiện có

    listSchedule.map(schedule => {
        listEdit.map(item => {
            if (schedule.id_schedule == item.id_schedule) {
                schedule.Status = item.status;
            }
        })
    })

    //Ghi dữ liệu mới vào Firebase
    await set(ref(database, 'Schedule'), listSchedule);
};

export default Updatewhenedit;
