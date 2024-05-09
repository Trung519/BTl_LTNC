import { getDatabase, ref, get } from "firebase/database";

const isSameHour = (time1, time2) => {
    const [hour1, minute1] = time1.split(":").map(Number); 
    const [hour2, minute2] = time2.split(":").map(Number); 

    const minutes1 = hour1 * 60 + minute1;
    const minutes2 = hour2 * 60 + minute2;

    console.log(hour1,minute1, "   ", hour2,minute2)
    console.log(Math.abs(minutes1 - minutes2) <= 30)
    return Math.abs(minutes1 - minutes2) <= 30; 
};

const isValidRoom = (time, date, room, id = -1) => {
    return new Promise(async (resolve, reject) => {
        try {
            const database = getDatabase();
            const dataRef = ref(database, 'Schedule');

            const snapshot = await get(dataRef);
            const listSchedule = snapshot.exists() ? Object.values(snapshot.val()) : []; 

            const isAvailable = listSchedule.some(schedule => {
                return schedule.id_schedule !== id && schedule.Room === room && schedule.Date === date && isSameHour(schedule.Time, time);
            });

            resolve(isAvailable);
        } catch (error) {
            reject(error);
        }
    });
};

export default isValidRoom;
