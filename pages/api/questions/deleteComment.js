// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// FIREBASE SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";

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

handler.delete(async (req, res) => {
    const questionId = req.query.questionId; // Assuming the post ID is passed in the URL as a query parameter
    const commentId = req.query.commentId; // Assuming the comment ID is passed in the URL as a query parameter

    if (!questionId || !commentId) {
        res.status(400).json({ error: "Missing Question ID or comment ID" });
        return;
    }

    try {
        const commentRef = ref(db, `Questions/Questions_/${questionId}/Comments/${commentId}`);

        // Remove the comment from the specified comment reference
        await remove(commentRef);

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.log("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
});

export default handler;
