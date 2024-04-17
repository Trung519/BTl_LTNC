import { getDatabase, ref, get, set } from "firebase/database";
import { AddSentMails } from "./SentMails";
import { AddReceivedMails } from "./ReceivedMails"
import { TransferUserNameIntoID } from "./TransferUserNameIntoID";
import RandomKey from "../RandomKey";



  export const SendMail = async (SENDER, newMail, callback) => {
    try {
        if (callback && typeof callback === 'function') {
            callback({
                title: "",
                content: "",
                receivers: []
            });
        }

        const database = getDatabase();
        const dataRef = ref(database, 'Notify/Mails/');

        const snapshot = await get(dataRef);
        const mailsData = snapshot.exists() ? snapshot.val() : [];

        const idNewMail = RandomKey();

        const listIDs = TransferUserNameIntoID(newMail.receivers);

        const receiver = [];

        for (let i in listIDs) {
            receiver.push({
                id: listIDs[i],
                username: newMail.receivers[i].Username,
            })
        }

        
        const newData = {
            content: newMail.content,
            date: newMail.time.split(' ')[1],
            hour: newMail.time.split(' ')[0],
            mail_id: idNewMail,
            sender:{
                id: SENDER.id,
                username: SENDER.userName,
            },
            receiver: receiver,
            subject: newMail.title
        };

        const updatedData = [...mailsData, newData];
        await set(ref(database, 'Notify/Mails/'), updatedData);

        await AddSentMails(idNewMail, SENDER.id);
        await AddReceivedMails(idNewMail, listIDs);
    } catch (error) {
        console.error("Error in SendMail:", error);
    }
};


