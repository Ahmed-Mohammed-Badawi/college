import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Form.module.css";
import Spinner from "@/components/spinner/Spinner";
import axios from "axios";
import { toast } from "react-toastify";

const Form = () => {
    // ROUTER
    const router = useRouter();

    // STATES
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState({
        projectTitle: "",
        projectDescription: "",
    });
    const [image, setImage] = useState(null);

    // HANDLERS
    async function submitHandler(event) {
        event.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", postData.projectTitle);
        data.append("description", postData.projectDescription);
        data.append("image", image);

        fetch("/api/questions/create", {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                // Handle the response data
                console.log(data);
            })
            .catch((error) => {
                setLoading(false);
                // Handle any errors
                console.error(error);
            });
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.formGroup}>
                <label htmlFor='projectTitle'>Question Header</label>
                <input
                    type='text'
                    id='projectTitle'
                    name='projectTitle'
                    placeholder='Title'
                    value={postData.projectTitle}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            projectTitle: e.target.value,
                        })
                    }
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor='projectDescription'>Question Description</label>
                <textarea
                    id='projectDescription'
                    name='projectDescription'
                    placeholder='Type your description...'
                    value={postData.projectDescription}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            projectDescription: e.target.value,
                        })
                    }
                />
            </div>
            <div className={styles.formGroup}>
                <label
                    className={styles.fileUploaderLabel}
                    htmlFor='fileUploader'
                >
                    File Uploader
                </label>
                <input
                    type='file'
                    id='fileUploader'
                    name='fileUploader'
                    value={postData.fileUploader}
                    accept={"image/*"}
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                />
                {image && (
                    <p className={styles.fileUploaderText_xx}>{image.name}</p>
                )}
            </div>
            <button type='submit'>
                {loading ? <Spinner size={0.5} color={"#ff5500"} /> : "Create"}
            </button>
        </form>
    );
};

export default Form;
