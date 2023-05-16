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
        serviceType: "",
        expectedDays: "",
        expectedCost: "",
        projectDescription: "",
        projectCategory: "",
    });
    const [image, setImage] = useState(null);

    // HANDLERS
    async function submitHandler(event) {
        event.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", postData.projectTitle);
        data.append("type", postData.serviceType);
        data.append("days", postData.expectedDays);
        data.append("price", postData.expectedCost);
        data.append("description", postData.projectDescription);
        data.append("category", postData.projectCategory);
        data.append("image", image);

        fetch("/api/posts/create", {
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
                <label htmlFor='projectTitle'>Project Title</label>
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
            <div className={[styles.formGroup]}>
                <label>
                    Are you a service provider or a service requester?
                </label>
                <div className={styles.Inputs_container}>
                    <div className={styles.radioButton}>
                        <input
                            type='radio'
                            id='serviceProvider'
                            name='serviceType'
                            value='provider'
                            onChange={(e) => {
                                setPostData({
                                    ...postData,
                                    serviceType: e.target.value,
                                });
                            }}
                        />
                        <label htmlFor='serviceProvider'>
                            Service Provider
                        </label>
                    </div>
                    <div className={styles.radioButton}>
                        <input
                            type='radio'
                            id='serviceRequester'
                            name='serviceType'
                            value='requester'
                            onChange={(e) => {
                                setPostData({
                                    ...postData,
                                    serviceType: e.target.value,
                                });
                            }}
                        />
                        <label htmlFor='serviceRequester'>
                            Service Requester
                        </label>
                    </div>
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor='category'>Category</label>
                <select name='category' id='category' value={postData.projectCategory} onChange={(e) => {
                    setPostData({
                        ...postData,
                        projectCategory: e.target.value,
                    });
                }}>
                    <option value='web'>Web</option>
                    <option value='mobile'>Mobile</option>
                    <option value='desktop'>Desktop</option>
                    <option value='game'>Game</option>
                    <option value='graphic'>Graphic</option>
                    <option value='video'>Video</option>
                    <option value='audio'>Audio</option>
                    <option value='writing'>Writing</option>
                    <option value='translation'>Translation</option>
                    <option value='marketing'>Marketing</option>
                    <option value='business'>Business</option>
                    <option value='legal'>Legal</option>
                    <option value='other'>Other</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor='expectedDays'>Expected number of days</label>
                <input
                    type='number'
                    id='expectedDays'
                    name='expectedDays'
                    placeholder='ex: 4'
                    value={postData.expectedDays}
                    onChange={(e) => {
                        setPostData({
                            ...postData,
                            expectedDays: e.target.value,
                        });
                    }}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor='expectedCost'>Expected number of cost</label>
                <input
                    type='number'
                    id='expectedCost'
                    name='expectedCost'
                    placeholder='ex: 250'
                    value={postData.expectedCost}
                    onChange={(e) => {
                        setPostData({
                            ...postData,
                            expectedCost: e.target.value,
                        });
                    }}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor='projectDescription'>Project Description</label>
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
