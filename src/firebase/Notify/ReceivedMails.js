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

export const GetReceivedMails = (userID, callback) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/ReceivedMails/');

    try {
        get(dataRef).then((snapshot) => {
            if (snapshot.exists()) {
                const dataID = snapshot.val();

                const dataRefMails = ref(database, 'Notify/Mails/');
                const listMails = [];

                get(dataRefMails).then((snapshotMails) => {
                    if (snapshotMails.exists()) {
                        const mails = snapshotMails.val();

                        for (let i in mails) {
                            for (let key in dataID) {
                                if (dataID[key].receiver_id == userID && dataID[key].mail_id == mails[i].mail_id) {
                                    listMails.push(mails[i])
                                }
                            }
                        }

                        if (callback && typeof callback === 'function') {
                            callback(listMails);
                        }
                    } else {
                        console.log("No mails found.");
                    }
                }).catch((error) => {
                    console.error("Error fetching mails:", error);
                });
            } else {
                console.log("No received mails found.");
            }
        }).catch((error) => {
            console.error("Error fetching received mails:", error);
        });
    } catch (error) {
        console.error("Error:", error);
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