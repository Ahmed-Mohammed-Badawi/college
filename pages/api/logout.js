// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { getAuth, signOut } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

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

const handler = nc();

handler.post(async (req, res) => {
    const auth = getAuth();

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
