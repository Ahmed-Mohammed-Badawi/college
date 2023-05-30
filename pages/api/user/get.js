// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";

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
