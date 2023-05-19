import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import nc from "next-connect";


// Initialize Firebase
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

const handler = nc().get(async (req, res) => {
    try {
        // Get user from Firebase authentication
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                res.status(200).json({ user });
            } else {
                res.status(401).json({ error: "User not found" });
            }
        });
    } catch (error) {
        console.error("Error getting user:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default handler;