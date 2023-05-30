// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

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

const handler = nc();

handler.post(async (req, res) => {
    const auth = getAuth(app);

    try {
        await signOut(auth);
        // Logout successful
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        // Logout failed
        console.log("Logout error:", error);
        res.status(500).json({ error: "Logout failed" });
    }
});

export default handler;
