// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp } from "firebase/app";
import {getDatabase, ref, get} from "firebase/database";

// Initialize Firebase app
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const handler = nc();

handler.get(async (req, res) => {
    // Get a reference to the Questions collection/Questions_Ref
    const questionsRef = ref(db, "Questions/Questions_");

    // Get posts from Realtime Database
    const snapshot = await get(questionsRef);

    if (!snapshot.exists()) {
        return res.status(404).json({ error: "Questions not found" });
    } else {
        return res.status(200).json(snapshot.val());
    }
});

export default handler;
