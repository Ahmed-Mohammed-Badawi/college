// Create a logout handler to use in the frontend
import axios from "axios";

export async function logoutHandler() {

    let logoutStatus = false;

    await axios.post("/api/logout")
        .then((_) => {
            logoutStatus = true;
        })
        .catch((_) => {
            logoutStatus = false;
        });

    return logoutStatus;
}