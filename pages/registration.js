import {useEffect, useState} from "react";
import styles from "../styles/css/Registration.module.css";
import Script from "next/script";
import Head from "next/head";
import Link from "next/link";
import getCssData from "@/helpers/readCssFile";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "@/components/spinner/Spinner";
import { useRouter } from "next/router";

//NODE
const path = require("path");

export default function RegistrationPage({ fileContent, user }) {
    // ROUTER
    const router = useRouter();

    // STATES
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push("/")
                .then(() => {
                    toast.error("You must be logged out to access this page");
                })
        }
    }, [user])

    // HANDLER
    const handleSubmit = (event) => {
        event.preventDefault();
        // perform validation here
        if (!name || !email || !password || !userName) {
            toast.error("Please fill all the fields!");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return;
        }

        if (userName.length < 3) {
            toast.error("Username must be at least 3 characters!");
            return;
        }

        if (/^[a-zA-Z0-9- ]*$/.test(userName) == false) {
            toast.error("Username must be alphanumeric!");
            return;
        }

        // EMAIL VALIDATION with regex
        const emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if (emailregex.test(email) == false) {
            toast.error("Email is not valid!");
            return;
        }

        // SEND THE CREATE USER REQUEST TO THE API
        setLoading(true);
        axios
            .post("/api/user/create", {
                name,
                email,
                password,
                userName,
            })
            .then((response) => {
                setLoading(false);
                console.log(response);
                // save the email and password in local storage
                localStorage.setItem("emailForSignIn", email);
                localStorage.setItem("passwordForSignIn", password);
                // reset form fields
                setName("");
                setEmail("");
                setPassword("");
                setUserName("");
                // Redirect to verify email page and show toast
                router.push("/verifyEmail").then(() => {
                    toast.success(
                        "User created successfully! please verify your email"
                    );
                });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                toast.error(
                    error.response?.data?.error ||
                        error.message ||
                        "Error creating user!"
                );
            });
    };

    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>Wasetak FREE</title>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                />
                <link
                    href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
                    rel='stylesheet'
                />
                <link
                    rel='stylesheet'
                    href='https://unpkg.com/boxicons@latest/css/boxicons.min.css'
                />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='true'
                />
                <style
                    dangerouslySetInnerHTML={{ __html: fileContent }}
                ></style>
            </Head>
            <div className={styles.container}>
                <Script
                    src='https://kit.fontawesome.com/44f50e4aac.js'
                    crossOrigin='anonymous'
                ></Script>
                <div className={styles.box}>
                    <h1>Registration</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <i className='fa-solid fa-user'></i>
                            <input
                                type='text'
                                placeholder='Enter Your Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <i className='fa-solid fa-envelope'></i>
                            <input
                                type='email'
                                placeholder='Enter Your Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <i className='fa-solid fa-lock'></i>
                            <input
                                type='password'
                                placeholder='Enter Your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <i class='fa-solid fa-circle-user'></i>
                            <input
                                type='tel'
                                placeholder='Enter Your Username'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <button type='submit' className={styles.tutu}>
                            {loading ? (
                                <Spinner size={0.5} color={"#ff5500"} />
                            ) : (
                                "Register"
                            )}
                        </button>
                    </form>
                    <span>
                        Already have an account?
                        <Link href='/login'>Login</Link>
                    </span>
                    <div className={styles.Home}>
                        <Link href='/' className={styles.home}>
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    // Load the CSS file
    const cssFilePath = path.join(
        process.cwd(),
        "styles",
        "css",
        "registration.css"
    );
    const fileContent = await getCssData(cssFilePath);
    return { props: { fileContent } };
}
