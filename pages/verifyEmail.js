// FRAMEWORK
import {useEffect, useState} from "react";
import Script from "next/script";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
// STYLES
import styles from "../styles/css/Registration.module.css";
// HELPERS
import getCssData from "@/helpers/readCssFile";
import axios from "axios";
// NOTIFICATION
import {toast} from "react-toastify";
// COMPONENTS
import Spinner from "@/components/spinner/Spinner";

//NODE MODULE TO READ THE FILE
const path = require("path");

export default function RegistrationPage({fileContent, user}) {
    // ROUTER
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push("/")
                .then(() => {
                    toast.error("You must be logged out to access this page");
                })
        }
    }, [user, router])

    const handleSubmit = (event) => {
        event.preventDefault();
        // GET THE EMAIL AND PASSWORD FROM LOCAL STORAGE
        const email = localStorage.getItem("emailForSignIn");
        const password = localStorage.getItem("passwordForSignIn");

        // Check if email and password are present in local storage
        if (!email || !password) {
            toast.error("Email and password not found! please register again");
            return;
        }

        // SEND THE CREATE USER REQUEST TO THE API
        setLoading(true);
        axios
            .put("/api/user/checkVerification", {
                email,
                password,
            })
            .then((response) => {
                setLoading(false);

                // Save the token in local storage and cookie
                localStorage.setItem("token", response.data.token);
                document.cookie = `token=${response.data.token}; path=/`;

                // Redirect to home page and show toast
                router.push("/").then(() => {
                    toast.success("Email verified successfully!");

                    // Delete the email and password in local storage
                    localStorage.removeItem("emailForSignIn");
                    localStorage.removeItem("passwordForSignIn");

                    // Reload the page after 2 seconds
                    setTimeout(() => {
                        router.reload();
                    }, 2000);
                });
            })
            .catch((error) => {
                setLoading(false);
                toast.error(
                    error.response?.data?.error ||
                    error.message ||
                    "Error Verifying user!"
                );
            });
    };

    // Resend verification email handler
    const handleResend = (event) => {
        event.preventDefault();
        // GET THE EMAIL AND PASSWORD FROM LOCAL STORAGE
        const email = localStorage.getItem("emailForSignIn");
        const password = localStorage.getItem("passwordForSignIn");

        // Check if email and password are present in local storage
        if (!email || !password) {
            toast.error("Email and password not found! please register again");
            return;
        }

        // SEND THE Resend verification email REQUEST TO THE API
        setResendLoading(true);
        axios
            .post("/api/user/reVerify", {
                email,
                password,
            })
            .then((_) => {
                setResendLoading(false);
                toast.success("Verification email sent successfully!");
            })
            .catch((error) => {
                setResendLoading(false);
                toast.error(
                    error.response?.data?.error ||
                    error.message ||
                    "Error sending verification email!"
                );
            });
    };

    return (
        <>
            <Head>
                <meta charSet='utf-8'/>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>Wasetak FREE</title>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                />
                {/*<link*/}
                {/*    href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'*/}
                {/*    rel='stylesheet'*/}
                {/*/>*/}
                <link
                    rel='stylesheet'
                    href='https://unpkg.com/boxicons@latest/css/boxicons.min.css'
                />
                <link rel='preconnect' href='https://fonts.googleapis.com'/>
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='true'
                />
                <style
                    dangerouslySetInnerHTML={{__html: fileContent}}
                ></style>
            </Head>
            <div className={styles.container}>
                <Script
                    src='https://kit.fontawesome.com/44f50e4aac.js'
                    crossOrigin='true'
                ></Script>
                <div className={styles.box}>
                    <h1>Verify Email</h1>
                    <form onSubmit={handleSubmit}>
                        <button type='submit' className={styles.tutu}>
                            {loading ? (
                                <Spinner size={0.5} color={"#ff5500"}/>
                            ) : (
                                "Verify"
                            )}
                        </button>
                        <button
                            type='button'
                            onClick={handleResend}
                            className={styles.tutu_resend}
                        >
                            {resendLoading ? (
                                <Spinner size={0.5} color={"#ff5500"}/>
                            ) : (
                                "Resend"
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

export async function getServerSideProps() {
    // Load the CSS file
    const cssFilePath = path.join(
        process.cwd(),
        "styles",
        "css",
        "registration.css"
    );
    const fileContent = await getCssData(cssFilePath);
    return {props: {fileContent}};
}
