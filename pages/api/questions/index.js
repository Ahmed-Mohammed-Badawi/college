// HELPER FUNCTION TO CHECK THE TYPE OF THE REQUEST
import nc from "next-connect";
// IMPORT THE FIREBASE SDK
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Initialize Firebase app
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
const db = getDatabase();

const handler = nc();

handler.get(async (req, res) => {
    // Get a reference to the Questions collection/Questions_Ref
    const questionsRef = ref(db, "Questions");

    // Get posts from Realtime Database
    const snapshot = await get(questionsRef);

    if (!snapshot.exists()) {
        return res.status(404).json({ error: "Questions not found" });
    } else {
        return res.status(200).json(snapshot.val());
    }
});

export default handler;
