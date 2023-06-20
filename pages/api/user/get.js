// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDwfOFbL7aqTy-WuPVOKr018hodXclFnxA",
    authDomain: "wassetkfree.firebaseapp.com",
    databaseURL: "https://wassetkfree-default-rtdb.firebaseio.com",
    projectId: "wassetkfree",
    storageBucket: "wassetkfree.appspot.com",
    messagingSenderId: "730291838695",
    appId: "1:730291838695:web:3e1c365434be36be864c42",
    measurementId: "G-P7M1HXBD2Z",
};
// Check if Firebase app is already initialized
if (!getApps().length) {
    const app = initializeApp(firebaseConfig);
}

const handler = nc();

handler.get(async (req, res) => {
    const db = getDatabase();
    const auth = getAuth();

    // CHECK IF USER IS AUTHENTICATED
    if (!auth.currentUser) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = auth.currentUser.uid;

    // Get user data from Realtime Database
    const userRef = ref(db, `Users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        res.status(200).json(snapshot.val());
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

export default handler;
