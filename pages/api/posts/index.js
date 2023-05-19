import nc from "next-connect";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

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

    try {
        onValue(postsRef, (snapshot) => {
            const posts = [];
            snapshot.forEach((childSnapshot) => {
                const post = childSnapshot.val();
                posts.push(post);
            });

            res.status(200).json(posts);
        });
    } catch (error) {
        console.log("Error retrieving posts:", error);
        res.status(500).json({ error: "Failed to retrieve posts" });
    }
});

export default handler;
