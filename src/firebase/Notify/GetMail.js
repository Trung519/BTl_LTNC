<<<<<<< HEAD
import { GetReceivedMails } from "./ReceivedMails";
import { GetSentMails } from "./SentMails";


export default function GetMail(userID, typeOfEmail, callback) {
    if (typeOfEmail == "received_mail") {
        GetReceivedMails(userID, callback);
    }
    else if (typeOfEmail == "sent_mail") {
=======
import { GetSentMails } from "./SentMails";
import { GetReceivedMails } from "./ReceivedMails";

export default function GetMail(userID, typeOfEmail, callback) {
    if (typeOfEmail === "received_mail") {
        GetReceivedMails(userID, callback);
    }
    else if (typeOfEmail === "sent_mail") {
>>>>>>> 9fe60dc52e26b5989d714df1bf91c560a7d71edc
        GetSentMails(userID, callback);
    }
}
