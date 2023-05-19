import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update, set } from "firebase/database";
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
        const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Check if user's email is verified
        if (!user.emailVerified) {
            res.status(401).json({ error: "Email not verified" });
            return;
        }

        // Generate ID token
        const token = await user.getIdToken();

        // Update user's token in Realtime Database
        const db = getDatabase();
        const userRef = ref(db, `Users/${user.uid}`);
        await update(userRef, { token });

        // Add the token to new collection called "Tokens" By the user ID
        const tokenRef = ref(db, `Tokens/${user.uid}`);
        await set(tokenRef, { token });


        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default handler;
