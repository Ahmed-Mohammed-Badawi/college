import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    getIdToken,
} from "firebase/auth";
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

const handler = nc().put(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Sign in user with email and password
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);

        const user = auth.currentUser;

        // Check if user's email is verified
        if (!user.emailVerified) {
            res.status(401).json({ error: "Email not verified" });
            return;
        }

        // Generate and save ID token in Realtime Database
        const token = await getIdToken(user);
        const db = getDatabase();
        const userRef = ref(db, `Users/${user.uid}`);
        await update(userRef, { token, verified: true });

        // Add the token to new collection called "Tokens" By the user ID
        const tokenRef = ref(db, `Tokens/${user.uid}`);
        await set(tokenRef, { token });

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error authenticating user:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default handler;
