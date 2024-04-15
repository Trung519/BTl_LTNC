import { getDatabase, ref, get } from "firebase/database"

export default function getUserNameByID(userID) {
    const database = getDatabase();
    const dataRef = ref(database, 'Account');

    try {
        get(dataRef).then((snapshot) => {
            if (snapshot.exists()) {
                const listUser = snapshot.val();
                for (let i in listUser) {
                    if (listUser[i].ID === userID) {
                        console.log(listUser[i].Username);
                    }
                }
                return("Not found");
            } else {
                console.log("No data found at 'Account'.");
            }
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

