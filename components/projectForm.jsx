// FRAMEWORK
import { useState } from "react";
import { useRouter } from "next/router";
// STYLE
import styles from "./Form.module.css";
// COMPONENTS
import Spinner from "@/components/spinner/Spinner";
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
            .then((_) => {
                setLoading(false);
                //REDIRECT TO PROJECT PAGE
                router.push(`/jobs`).then(() => {
                    // Handle the response data
                    toast.success("Project created successfully");
                });
            })
            .catch((error) => {
                setLoading(false);
                // Handle any errors
                toast.error(
                    error?.response?.data?.message ||
                        error?.message ||
                        "Project creation failed"
                );
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
                <select
                    name='category'
                    id='category'
                    value={postData.projectCategory}
                    onChange={(e) => {
                        setPostData({
                            ...postData,
                            projectCategory: e.target.value,
                        });
                    }}
                >
                    <option value='Admin & Customer Support'>
                        Admin & Customer Support
                    </option>
                    <option value='Consulting & HR'>Consulting & HR</option>
                    <option value='Design'>Design</option>
                    <option
                        value='Development & IT
'
                    >
                        Development & IT
                    </option>
                    <option value='Lifestyle'>Lifestyle</option>
                    <option value='Marketing'>Marketing</option>
                    <option value='Video & Audio'>Video & Audio</option>
                    <option value='Writing & Translation'>
                        Writing & Translation
                    </option>
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
