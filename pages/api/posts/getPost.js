import nc from "next-connect";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

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
    const postId = req.query.id; // Assuming the post ID is passed in the URL as a query parameter

    if(!postId) {
        res.status(400).json({ error: "Missing post ID" });
        return;
    }

    try {
        const postRef = child(ref(db), `Posts/${postId}`);
        const snapshot = await get(postRef);

        if (snapshot.exists()) {
            const post = snapshot.val();
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        console.log("Error retrieving post:", error);
        res.status(500).json({ error: "Failed to retrieve post" });
    }
});

export default handler;
