// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import {initializeApp, getApps} from "firebase/app";
import {getDatabase, ref, remove} from "firebase/database";

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

handler.delete(async (req, res) => {
    const postId = req.query.postId; // Assuming the post ID is passed in the URL as a query parameter
    const commentId = req.query.commentId; // Assuming the comment ID is passed in the URL as a query parameter

    if (!postId || !commentId) {
        res.status(400).json({error: "Missing post ID or comment ID"});
        return;
    }

    try {
        const commentRef = ref(db, `Posts/${postId}/Comments/${commentId}`);

        // Remove the comment from the specified comment reference
        await remove(commentRef);

        res.status(200).json({message: "Comment deleted successfully"});
    } catch (error) {
        console.log("Error deleting comment:", error);
        res.status(500).json({error: "Failed to delete comment"});
    }
});

export default handler;
