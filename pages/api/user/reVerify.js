// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp,getApps } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";

// Initialize Firebase
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
