import { useState } from "react";
import styles from "../styles/css/Registration.module.css";
import Script from "next/script";
import Head from "next/head";
import Link from "next/link";
import getCssData from "@/helpers/readCssFile";

//NODE
const path = require("path");

export default function RegistrationPage({ fileContent }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // perform validation here

        // reset form fields
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setDob("");
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
                {/* <link
                    rel='stylesheet'
                    type='text/css'
                    href='/css/registration.css'
                /> */}
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
                            <i className='fa-solid fa-phone'></i>
                            <input
                                type='tel'
                                placeholder='Enter Your Phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <i className='fa-solid fa-calendar'></i>
                            <input
                                type='date'
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <button type='submit' className={styles.tutu}>
                            Create account
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
    const cssFilePath = path.join(process.cwd(), "styles", "css", "registration.css");
    const fileContent = await getCssData(cssFilePath);
    return { props: { fileContent } };
}
