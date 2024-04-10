import { GetSentMails } from "./SentMails";
import { GetReceivedMails, GetReceivedID } from "./ReceivedMails";
import { useState, useEffect } from "react";

export default function GetMail(userID, typeOfEmail, callback) {
    const [listID, setListID] = useState([]);
    
    useEffect(() => {
        if (typeOfEmail === "received_mail") {
            GetReceivedID(userID, setListID);
        }
    }, [userID, typeOfEmail]);

    useEffect(() => {
        if (typeOfEmail === "received_mail") {
            GetReceivedMails(userID, listID, callback);
        } else if (typeOfEmail === "sent_mail") {
            GetSentMails(userID, callback);
        }
    }, [userID, listID, typeOfEmail, callback]);
}
