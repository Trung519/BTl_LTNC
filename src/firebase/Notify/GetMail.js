import { GetReceivedMails } from "./ReceivedMails";
import { GetSentMails } from "./SentMails";


export default function GetMail(userID, typeOfEmail, callback) {
    if (typeOfEmail == "received_mail") {
        GetReceivedMails(userID, callback);
    }
    else if (typeOfEmail == "sent_mail") {
        GetSentMails(userID, callback);
    }
}
