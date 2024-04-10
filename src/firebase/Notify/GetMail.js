import { GetSentMails } from "./SentMails";
import { GetReceivedMails } from "./ReceivedMails";

export default function GetMail(userID, typeOfEmail, callback) {
    if (typeOfEmail === "received_mail") {
        GetReceivedMails(userID, callback);
    }
    else if (typeOfEmail === "sent_mail") {
        GetSentMails(userID, callback);
    }
}
