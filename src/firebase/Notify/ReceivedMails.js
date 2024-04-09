import { getDatabase, ref, get, set } from "firebase/database";

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

export const GetReceivedMails = async (userID) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/ReceivedMails/');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let dataReceivedMails = snapshot.exists() ? snapshot.val() : []; // Dữ liệu hiện có

    const listReceivedMails = [];

    for (let key in dataReceivedMails) {
        const mail = dataReceivedMails[key];
        if (mail.receiver_id == userID) {
            listReceivedMails.push(mail);
        }
    }
};

export const AddReceivedMails = async (mailID, listID) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/ReceivedMails/');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    const receivedMails = snapshot.exists() ? snapshot.val() : [];

    const updatedData = [...receivedMails];

    console.log(updatedData);
    console.log(listID);

    for (let i = 0; i < listID.length; i++) {
        const newData = {
            mail_id: mailID,
            receiver_id: listID[i]
        };
        updatedData.push(newData);
    }

    console.log(updatedData);

    await set(ref(database, 'Notify/ReceivedMails/'), updatedData);
};


export const RemoveReceivedMails = async (userID, listMailIDs) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/ReceivedMails/');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let dataReceivedMails = snapshot.exists() ? snapshot.val() : [];

    // Loại bỏ các email có trong danh sách listMailIDs
    const newData = dataReceivedMails.filter(mail => {
        const isToRemove = listMailIDs.some(mailToRemove => {
            return mailToRemove.mail_id == mail.mail_id && userID == mail.receiver_id;
        });
        // Trả về true để giữ email, false để loại bỏ email đó khỏi danh sách
        return !isToRemove;
    });

    // Ghi dữ liệu mới vào Firebase
    await set(ref(database, 'Notify/ReceivedMails/'), newData);
};