// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update, set } from "firebase/database";

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
