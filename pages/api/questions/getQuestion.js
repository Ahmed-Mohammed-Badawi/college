// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import {initializeApp} from "firebase/app";
import {getDatabase, ref, child, get} from "firebase/database";

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
    const questionID = req.query.id; // Assuming the post ID is passed in the URL as a query parameter

    if (!questionID) {
        res.status(400).json({error: "Missing post ID"});
        return;
    }

    try {
        const questionRef = child(ref(db), `Questions/Questions_/${questionID}`);
        const snapshot = await get(questionRef);

        if (snapshot.exists()) {
            const question = snapshot.val();

            // GET THE USER WHO ASKED THE QUESTION
            const userRef = child(ref(db), `Users/${question.user_id}`);
            const userSnapshot = await get(userRef);

            if (userSnapshot.exists()) {
                question.user = userSnapshot.val();
            }

            res.status(200).json(question);
        } else {
            res.status(404).json({error: "Post not found"});
        }
    } catch (error) {
        console.log("Error retrieving post:", error);
        res.status(500).json({error: "Failed to retrieve post"});
    }
});

export default handler;
