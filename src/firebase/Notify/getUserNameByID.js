import { getDatabase, ref, get } from "firebase/database";

function getUserNameByID(userID, callback) {
    const database = getDatabase();
    const dataRef = ref(database, 'Account');

    try {
        get(dataRef).then((snapshot) => {
            if (snapshot.exists()) {
                const listUser = snapshot.val();
                for (let i in listUser) {
                    if (listUser[i].ID === userID) {
                        callback(listUser[i].Username);
                        return; // exit the loop once username is found
                    }
                }
                // If userID not found, invoke callback with appropriate value
                callback("Not found");
            } else {
                console.log("No data found at 'Account'.");
            }
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

export default getUserNameByID;
