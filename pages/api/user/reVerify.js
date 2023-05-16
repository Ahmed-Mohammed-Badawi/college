import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
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
initializeApp(firebaseConfig);

const handler = nc().post(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Sign in user with email and password
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);

        const user = auth.currentUser;

        // Resend email verification
        await sendEmailVerification(user);

        res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
        console.error("Error resending verification email:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default handler;
