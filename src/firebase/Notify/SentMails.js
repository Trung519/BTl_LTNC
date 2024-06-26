import { getDatabase, ref, get, set, onValue } from "firebase/database";

export const AddSentMails = async (mailID, senderID) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/SentMails/');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let existingData = snapshot.exists() ? snapshot.val() : []; // Dữ liệu hiện có

    const newData = {
        mail_id: mailID,
        sender_id: senderID,
    };

    // Di chuyển dữ liệu hiện có xuống một cấp
    const updatedData = {};
    for (let key in existingData) {
        updatedData[parseInt(key) + 1] = existingData[key];
    }

    // Thêm dữ liệu mới vào vị trí đầu tiên
    updatedData[0] = newData;

    // Ghi dữ liệu mới vào Firebase
    await set(ref(database, 'Notify/SentMails/'), updatedData);
};

export const GetSentMails = (user, callback = function (err) {
    console.log(err);
}) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/SentMails/');

    onValue(dataRef, (snapshot) => {
        const dataID = snapshot.val();

        const dataRefMails = ref(database, 'Notify/Mails/');

        onValue(dataRefMails, (snapshotMails) => {
            const mails = snapshotMails.val();

            const listMails = [];

            for (let i = mails.length - 1; i >= 0; i--) {
                for (let key in dataID) {
                    if (dataID[key].sender_id == user.id && dataID[key].mail_id == mails[i].mail_id) {
                        listMails.push(mails[i])
                    }
                }
            }

            callback(listMails);
        })
    })
};


export const RemoveSentMails = async (user, listMailIDs) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/SentMails/');

    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let dataSentMail = snapshot.exists() ? snapshot.val() : [];

    // Loại bỏ các email có trong danh sách listMailIDs
    const newData = dataSentMail.filter(mail => {
        const isToRemove = listMailIDs.some(mailToRemove => {
            return mailToRemove === mail.mail_id && user.id === mail.sender_id;
        });
        // Trả về true để giữ email, false để loại bỏ email đó khỏi danh sách
        return !isToRemove;
    });

    // Ghi dữ liệu mới vào Firebase
    await set(ref(database, 'Notify/SentMails/'), newData);
};
