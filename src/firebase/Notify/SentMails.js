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

export const GetSentMails = (userID, callback) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/SentMails/');

    try {
        get(dataRef).then((snapshot) => {
            if (snapshot.exists()) {
                const dataID = snapshot.val();

                const dataRefMails = ref(database, 'Notify/Mails/');
                const listMails = [];

                get(dataRefMails).then((snapshotMails) => {
                    if (snapshotMails.exists()) {
                        const mails = snapshotMails.val();

                        for (let i = mails.length - 1; i >= 0; i--) {
                            for (let key in dataID) {
                                if (dataID[key].sender_id == userID && dataID[key].mail_id == mails[i].mail_id) {
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


export const RemoveSentMails = async (userID, listMailIDs, callback) => {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/SentMails/');
  
    // Lấy dữ liệu hiện có từ Firebase
    const snapshot = await get(dataRef);
    let dataSentMail = snapshot.exists() ? snapshot.val() : []; 
    
    // Loại bỏ các email có trong danh sách listMailIDs
    const newData = dataSentMail.filter(mail => {
        const isToRemove = listMailIDs.some(mailToRemove => {
            return mailToRemove.mail_id == mail.mail_id && userID == mail.sender_id;
        });
        // Trả về true để giữ email, false để loại bỏ email đó khỏi danh sách
        return !isToRemove;
    });

    // Ghi dữ liệu mới vào Firebase
    await set(ref(database, 'Notify/SentMails/'), newData);
  
    // Gọi callback nếu có
    if (callback && typeof callback === 'function') {
        callback([]);
    }
};
