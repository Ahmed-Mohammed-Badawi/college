// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// FIREBASE SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";

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

handler.post(async (req, res) => {
    try {
        const questionId = req.query.questionId; // Assuming the post ID is passed in the URL as a query parameter
        const { comment } = req.body; // Assuming the comment data is sent in the request body

        if (!questionId) {
            return res.status(400).json({ error: "Missing Question ID" });
        }

        // GET THE USER ID FROM THE DATABASE
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user.uid;

        // GET THE USER INFO FROM THE DATABASE
        const userRef = ref(db, `Users/${userId}`);
        const userSnapshot = await get(userRef);

        const newCommentId = String(Date.now());
        // const commentsRef = ref(db, `Posts/${postId}/Comments`);
        const newCommentRef = ref(db, `Questions/Questions_/${questionId}/Comments/${newCommentId}`);

        // New comment data
        const newCommentData = {
            id: userId,
            dp: userSnapshot.val()?.photo || "",
            mane: userSnapshot.val()?.name || "",
            cId: Date.now(),
            comment: comment,
            // Time by milliseconds
            timestamp: Date.now(),
            pLikes: 0,
            type: "image",
        };

        // Create the new comment
        await set(newCommentRef, newCommentData);

        return res.status(200).json({ message: "Comment created successfully" });
    } catch (error) {
        console.log("Error creating comment:", error);
        return res.status(500).json({ error: "Failed to create comment" });
    }
});

export default handler;
