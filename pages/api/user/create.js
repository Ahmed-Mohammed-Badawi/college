// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp, getApps } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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
    const { name, email, password, userName } = req.body;

    try {
        // Create user in Firebase Authentication
        const auth = getAuth();
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Send email verification
        await sendEmailVerification(auth.currentUser);

        // Save user data in Realtime Database with token
        const db = getDatabase();
        const userRef = ref(db, `Users/${user.uid}`);
        await set(userRef, {
            id: user.uid,
            name,
            username: userName,
            email,
            password,
            phone: "",
            photo: "https://firebasestorage.googleapis.com/v0/b/wassetkfree.appspot.com/o/avatar.jpg?alt=media&token=20edd7ca-1994-4559-ab1e-786d088092f2",
            country: "EG",
            bio: "",
            message: "",
            status: "online",
            regTime: String(new Date.now()),
            lastSeen: String(new Date.now()),
            typingTo: "noOne",
            balance: String(0),
            token: null, // Initialize token as null
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default handler;
