import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import formidable from "formidable";
// NODE MODULES
import fs from "fs";

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
    initializeApp(firebaseConfig);
}

// Get Realtime Database and Storage instances
const database = getDatabase();
const storage = getStorage();

export const config = {
    api: {
        bodyParser: false, // Disable the default body parser
    },
};

export default async function handler(req, res) {
    // GET THE TOKEN FROM THE COOKIE
    const token = req.cookies.token;

    // VERIFY TOKEN
    const auth = getAuth();

    // Verify the token
    const result = auth.currentUser;

    // Check if the token is valid for the current user and if not, return an error
    if (!result) {
        res.status(403).json({ error: "Not authorized." });
        return;
    }

    // GET THE USER ID FROM THE TOKEN
    const userId = result.uid;

    // GET THE USER DATA FROM THE DATABASE
    const userRef = ref(database, `Users/${userId}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    if (req.method === "POST") {
        try {
            const form = formidable();

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error("Error parsing form data:", err);
                    res.status(500).json({
                        error: "Failed to process form data.",
                    });
                    return;
                }

                const { title, type, days, price, description, category } =
                    fields;
                const { image } = files;
                let imageUrl;

                if (image) {
                    async function uploadImage() {
                        // Read the image file as a buffer
                        const imageBuffer = fs.readFileSync(image.filepath);

                        // Upload the image buffer to Firebase Storage
                        const imageRef = storageRef(
                            storage,
                            `images/${image.newFilename}${image.originalFilename}`
                        );

                        const snapshot = await uploadBytes(
                            imageRef,
                            imageBuffer
                        );
                        imageUrl = await getDownloadURL(snapshot.ref);
                        console.log("url", imageUrl);
                    }

                    await uploadImage();
                }

                // Create a new post-entry in the Realtime Database
                const newPostId = String(Date.now()); // Generate a unique ID based on the current time in milliseconds
                const newPostRef = ref(database, `Posts/${newPostId}`);
                const newPostData = {
                    id: String(userId),
                    name: String(userData?.name),
                    db: String(userData?.photo),
                    pId: String(newPostId),
                    project_name: String(title),
                    type: "Image",
                    text: String(description),
                    pViews: String(0),
                    pComments: String(0),
                    meme: imageUrl ? String(imageUrl) : "noImage",
                    vine: "noVideo",
                    pTime: String(new Date().getTime()), // Use getTime() to get the timestamp in milliseconds
                    project_type: type === "provider" ? String(1) : String(0),
                    category: String(category),
                    day: String(days),
                    cost: String(price),
                    status: "on",
                };

                set(newPostRef, newPostData);
                res.status(201).json({ message: "Post created successfully" });
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to create post." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}
