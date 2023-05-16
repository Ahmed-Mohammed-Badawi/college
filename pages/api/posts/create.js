import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, push, set, get } from "firebase/database";
import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import formidable from "formidable";
import fs from "fs";

// Initialize Firebase app
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

                const { title, type, days, price, description, category } = fields;
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

                // Create a new post entry in the Realtime Database
                const newPostId = String(Date.now()); // Generate a unique ID based on the current time in milliseconds
                const newPostRef = ref(database, `Posts/${newPostId}`);
                const newPostData = {
                    id: userId,
                    name: userData?.name,
                    db: userData?.photo,
                    pId: newPostId,
                    project_name: title,
                    type: "Image",
                    text: description,
                    pViews: 0,
                    pComments: 0,
                    meme: imageUrl ? imageUrl : null,
                    vine: null,
                    pTime: new Date().getTime(), // Use getTime() to get the timestamp in milliseconds
                    project_type: type === "provider" ? 1 : 0,
                    category: category,
                    day: days,
                    cost: price,
                    status: "on",
                };

                set(newPostRef, newPostData)
                    .then(() => {
                        console.log(
                            "Post saved successfully with ID:",
                            newPostId
                        );
                    })
                    .catch((error) => {
                        console.error("Error saving post:", error);
                    });

                res.status(200).json({ message: "Post created successfully" });
            });
        } catch (error) {
            console.error("Error creating post:", error);
            res.status(500).json({ error: "Failed to create post." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}