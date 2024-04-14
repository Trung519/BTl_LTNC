import { getDatabase, ref, get, set } from "firebase/database";
import { AddSentMails } from "./SentMails";
import { AddReceivedMails } from "./ReceivedMails"
import { TransferUserNameIntoID } from "./TransferUserNameIntoID";
import RandomKey from "../RandomKey";



  export const SendMail = async (sender, newMail, callback) => {
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
        
        const newData = {
            mail_id: idNewMail,
            sender_id: sender.id,
            sender: sender.userName,
            receiver_id: listIDs,
            content: newMail.content,
            subject: newMail.title,
            hour: newMail.time.split(' ')[0],
            date: newMail.time.split(' ')[1]
        };

        const updatedData = [...mailsData, newData];
        await set(ref(database, 'Notify/Mails/'), updatedData);

        await AddSentMails(idNewMail, sender.id);
        await AddReceivedMails(idNewMail, listIDs);
    } catch (error) {
        console.error("Error in SendMail:", error);
    }
};


