import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";

export const GetReceivedMails = (user, callback = function (err) {
    console.log(err);
}) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/ReceivedMails/');

    onValue(dataRef, (snapshot) => {
        const dataID = snapshot.val();

        const dataRefMails = ref(database, 'Notify/Mails/');

        onValue(dataRefMails, (snapshotMails) => {
            const mails = snapshotMails.val();

            const listMails = [];

            for (let i = mails.length - 1; i >= 0; i--) {
                for (let key in dataID) {
                    if (dataID[key].receiver_id == user.id && dataID[key].mail_id == mails[i].mail_id) {
                        listMails.push(mails[i])
                    }
                }
            }

            callback(listMails);
        })
    })
};

export const AddReceivedMails = async (mailID, listID) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/ReceivedMails/');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let receivedMails = [];

    if (snapshot.exists()) {
        const data = snapshot.val();
        // Check if data is an array, if not, convert it to an array
        receivedMails = Array.isArray(data) ? data : Object.values(data);
    }

    const updatedData = [...receivedMails];

    for (let i = 0; i < listID.length; i++) {
        const newData = {
            mail_id: mailID,
            receiver_id: listID[i]
        };
        updatedData.push(newData);
    }

    await set(ref(database, 'Notify/ReceivedMails/'), updatedData);
};



export const RemoveReceivedMails = async (user, listMailIDs) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/ReceivedMails/');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let dataReceivedMails = snapshot.exists() ? snapshot.val() : [];

    // Loại bỏ các email có trong danh sách listMailIDs
    const newData = dataReceivedMails.filter(mail => {
        const isToRemove = listMailIDs.some(mailToRemove => {
            return mailToRemove === mail.mail_id && user.id === mail.receiver_id;
        });
        // Trả về true để giữ email, false để loại bỏ email đó khỏi danh sách
        return !isToRemove;
    });

    // Ghi dữ liệu mới vào Firebase
    await set(ref(database, 'Notify/ReceivedMails/'), newData);
};