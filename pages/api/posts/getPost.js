// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

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

handler.get(async (req, res) => {
    const postId = req.query.id; // Assuming the post ID is passed in the URL as a query parameter

    if (!postId) {
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
