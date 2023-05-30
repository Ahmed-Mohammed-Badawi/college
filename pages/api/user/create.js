// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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
            regTime: new Date().getMilliseconds(),
            lastSeen: new Date().getMilliseconds(),
            typingTo: "noOne",
            balance: 0,
            token: null, // Initialize token as null
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default handler;
