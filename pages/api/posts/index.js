import nc from "next-connect";
import { initializeApp } from "firebase/app";
import {getDatabase, ref, onValue, get} from "firebase/database";

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
    const postsRef = ref(db, "Posts");

    // Get posts from Realtime Database
    const snapshot = await get(postsRef);

    if (!snapshot.exists()) {
        return res.status(404).json({ error: "Posts not found" });
    } else {
        return res.status(200).json(snapshot.val());
    }
});

export default handler;
