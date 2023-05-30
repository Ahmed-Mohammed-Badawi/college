import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import getCssData from "@/helpers/readCssFile";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import Spinner from "@/components/spinner/Spinner";
import { toast } from "react-toastify";
import axios from "axios";

//NODE
const path = require("path");

export default function Login({ fileContent, user }) {
    // ROUTER
    const router = useRouter();

    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push("/")
                .then(() => {
                    toast.error("You must be logged out to access this page");
                })
        }
    }, [user, router])

    // HANDLER
    const handleSubmit = (event) => {
        event.preventDefault();
        // perform validation here
        if (!email || !password) {
            toast.error("Please fill all the fields!");
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
            .post("/api/user/login", {
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
                    toast.success("Logged in successfully!");

                    // Reload the page to get the user data
                    router.reload();
                });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                toast.error(
                    error.response?.data?.error ||
                        error.message ||
                        "Error logging in!"
                );
            });
    };

    return (
        <>
            <Head>
                <meta charset='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>Login</title>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                />
                {/* <link rel='stylesheet' type='text/css' href='/css/login.css' /> */}
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
                    crossorigin
                />
                <style
                    dangerouslySetInnerHTML={{ __html: fileContent }}
                ></style>
            </Head>

            <div className='container'>
                <Script
                    src='https://kit.fontawesome.com/44f50e4aac.js'
                    crossOrigin='anonymous'
                ></Script>
                <div className='box'>
                    <h1>Login</h1>
                    <form>
                        <label>Email</label>
                        <div>
                            <i className='fa-solid fa-user'></i>
                            <input
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>
                        <label>Password</label>
                        <div>
                            <i className='fa-solid fa-lock'></i>
                            <input
                                type='password'
                                placeholder='Enter Password'
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </div>
                        <a href='#' className='forgot'>
                            Forgot Password?
                        </a>
                        <Link
                            href='/login'
                            className='tut'
                            onClick={handleSubmit}
                        >
                            {loading ? (
                                <Spinner size={0.5} color={"#ff5500"} />
                            ) : (
                                "Login"
                            )}
                        </Link>
                        <Link href='/registration' className='sign-up'>
                            Sign Up
                        </Link>
                    </form>

                    <div className='Home'>
                        <Link href='/' className='home'>
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
    const cssFilePath = path.join(process.cwd(), "styles", "css", "login.css");
    const fileContent = await getCssData(cssFilePath);
    return { props: { fileContent } };
}
