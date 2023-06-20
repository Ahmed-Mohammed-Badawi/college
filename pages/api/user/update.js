// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, update, ref } from "firebase/database";

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

const handler = nc().put(async (req, res) => {
    // Get user data from request body
    const { name, bio, country, username } = req.body;

    const auth = getAuth();

    // CHECK IF USER IS AUTHENTICATED
    if (!auth.currentUser) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = auth.currentUser.uid;

    // Update user profile in Firebase real-time database
    const db = getDatabase();
    const userRef = ref(db, `Users/${userId}`);

    try {
        await update(userRef, { name, bio, country, username });
        res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default handler;
