import { GetSentMails } from "./SentMails";
import { GetReceivedMails } from "./ReceivedMails";

import { onValue, getDatabase, ref } from "firebase/database";

function GetMails(callback = () => {
    console.log("error: GetMails");
}) {
    const database = getDatabase();
    const dataRef = ref(database, 'Notify/Mails/');

    onValue(dataRef, (snapshot) => {
        const mails = snapshot.val();
        callback(mails);
    })
}

export default function GetMail(user, typeOfEmail, callback) {
    if (typeOfEmail === "received_mail") {
        GetReceivedMails(user, callback);
    }
    else if (typeOfEmail === "sent_mail") {
        GetSentMails(user, callback);
    }
    else if (typeOfEmail === "all"){
        GetMails(callback);
    }
}
