// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";

// Initialize Firebase app
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
const db = getDatabase();

const handler = nc();

handler.post(async (req, res) => {
    try {
        const postId = req.query.postId; // Assuming the post ID is passed in the URL as a query parameter
        const { cost, days, offer } = req.body; // Assuming the comment data is sent in the request body

        if (!postId) {
            return res.status(400).json({ error: "Missing post ID" });
        }

        // GET THE USER ID FROM THE DATABASE
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user.uid;

        // GET THE USER INFO FROM THE DATABASE
        const userRef = ref(db, `Users/${userId}`);
        const userSnapshot = await get(userRef);

        const newCommentId = String(Date.now());
        const commentsRef = ref(db, `Posts/${postId}/Comments`);
        const newCommentRef = ref(
            db,
            `Posts/${postId}/Comments/${newCommentId}`
        );

        // Get all comments from the database and check if the same user has already commented on the post
        const commentsSnapshot = await get(commentsRef);
        const comments = commentsSnapshot.val();

        // CHECK IF THE USER IS ALREADY COMMENTED ON THE POST
        if (comments) {
            const commentIds = Object.keys(comments);
            const userCommentId = commentIds.find((commentId) => {
                return comments[commentId].id === userId;
            });

            if (userCommentId) {
                return res
                    .status(400)
                    .json({ error: "User already commented" });
            }
        }

        // New comment data
        const newCommentData = {
            id: String(userId),
            dp: String(userSnapshot.val()?.photo) || "",
            mane: String(userSnapshot.val()?.name )|| "",
            pId: String(postId),
            cId: String(newCommentId),
            comment: String(offer),
            // Time by milliseconds
            timestamp: String(Date.now()),
            pLikes: String(0),
            type: "text",
            cost: String(cost),
            day: String(days),
        };

        // Create the new comment
        await set(newCommentRef, newCommentData);

        return res
            .status(200)
            .json({ message: "Comment created successfully" });
    } catch (error) {
        console.log("Error creating comment:", error);
        return res.status(500).json({ error: "Failed to create comment" });
    }
});

export default handler;
