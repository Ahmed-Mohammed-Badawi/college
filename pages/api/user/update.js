// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, update, ref } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC4BPVHHKQjrEuHu6PSl1H1NVSX22_7RzY",
    authDomain: "freelancer-graduate-project.firebaseapp.com",
    databaseURL:
        "https://freelancer-graduate-project-default-rtdb.firebaseio.com",
    projectId: "freelancer-graduate-project",
    storageBucket: "freelancer-graduate-project.appspot.com",
    messagingSenderId: "850585391310",
    appId: "1:850585391310:web:568cf0b3e4ad87afd0809f",
    measurementId: "G-GS23FX3SQ2",
};

initializeApp(firebaseConfig);

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
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default handler;