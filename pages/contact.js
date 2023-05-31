// FRAMEWORK
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import {useRouter} from "next/router";
// HELPERS
import getCssData from "@/helpers/readCssFile";
import {logoutHandler} from "@/helpers/logoutHandler";
// NOTIFICATIONS
import {toast} from "react-toastify";

//NODE MODULE TO READ THE STYLE FILE
const path = require("path");

export default function ContactForm({fileContent, user}) {
    // ROUTER
    const router = useRouter();

    // STATES
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [message, setMessage] = useState("");
    const [isChecked, setIsChecked] = useState(true);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && companyName && message) {
            setName("");
            setEmail("");
            setCompanyName("");
            setMessage("");
            setIsChecked(true);
            setNameError("");
            setEmailError("");
        } else {
            if (!name) {
                setNameError("Name is required");
            }
            if (!email) {
                setEmailError("Email is required");
            }
        }
    };

    const handleReset = () => {
        setName("");
        setEmail("");
        setCompanyName("");
        setMessage("");
        setIsChecked(true);
        setNameError("");
        setEmailError("");
    };

    useEffect(() => {
        document.body.classList.add("mar0");
    }, []);

    return (
        <div className={""}>
            <Head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>GET IN TOUCH</title>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                />
                <link
                    href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
                    rel='stylesheet'
                />
                {/* <link rel='stylesheet' type='text/css' href='/css/Contact.css' /> */}
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
                {/* <script src='JS/Contact.js' defer></script> */}
                <style
                    dangerouslySetInnerHTML={{ __html: fileContent }}
                ></style>
            </Head>
            <header className={"head"}>
                <Script
                    src='https://kit.fontawesome.com/44f50e4aac.js'
                    crossOrigin='true'
                ></Script>
                <nav className={"head-nav"}>
                    <div className={"nav-bar1"}>
                        <ul>
                            <li onClick={() => router.push('/')} style={{cursor: 'pointer'}}>Wasetak FREE</li>
                            <li>
                                <Link href='#'>How it Works?</Link>
                            </li>
                            <li>
                                <Link href='#'>Browse Jobs </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={"nav-bar2"}>
                        <ul>
                            {user ? (
                                <>
                                    <li>
                                        <Link href='/profile'>Profile</Link>
                                    </li>
                                    <li>
                                        <Link href='#' onClick={async (event) => {
                                            event.preventDefault();
                                            const status = await logoutHandler();
                                            if (status) {
                                                router.push("/")
                                                    .then(() => {
                                                        router.reload();
                                                    })
                                            }else {
                                                toast.error("Something went wrong while logging out");
                                            }
                                        }}>Logout</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href='/login'>Log In</Link>
                                    </li>
                                    <li>
                                        <Link href='/registration'>Sign Up</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
                <section>
                    <div className={"nav"}>
                        <ul>
                            <li>
                                <Link href='/freelancer/hire'>
                                    Hire a Freelancer
                                </Link>
                            </li>
                            <li>
                                <Link href='/jobs'>projects</Link>
                            </li>
                            <li>
                                <Link href='/questions'>
                                    Questions
                                </Link>
                            </li>
                            <li>
                                <Link href='/questions/create'>
                                    Ask a Question
                                </Link>
                            </li>
                            <li>
                                <Link href='/about_us'>About</Link>
                            </li>
                            <li>
                                <Link href='/contact'>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
            <main>
                <div className='contain'>
                    <div className='wrapper'>
                        <div className='form'>
                            <h4>GET IN TOUCH</h4>
                            <h2 className='form-headline'>Send us a message</h2>
                            <form onSubmit={handleSubmit}>
                                <p>
                                    <input
                                        id='name'
                                        className='form-input'
                                        type='text'
                                        placeholder='Your Name*'
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <small className='name-error'>
                                        {nameError}
                                    </small>
                                </p>
                                <p>
                                    <input
                                        id='email'
                                        className='form-input'
                                        type='email'
                                        placeholder='Your Email*'
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <small className='name-error'>
                                        {emailError}
                                    </small>
                                </p>
                                <p className='full-width'>
                                    <input
                                        id='company-name'
                                        className='form-input'
                                        type='text'
                                        placeholder='Company Name*'
                                        value={companyName}
                                        onChange={(e) =>
                                            setCompanyName(e.target.value)
                                        }
                                        required
                                    />
                                    <small></small>
                                </p>
                                <p className='full-width'>
                                    <textarea
                                        minLength='20'
                                        id='message'
                                        cols='30'
                                        rows='7'
                                        placeholder='Your Message*'
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        required
                                    ></textarea>
                                    <small></small>
                                </p>
                                <p className='full-width'>
                                    <input
                                        type='checkbox'
                                        id='checkbox'
                                        name='checkbox'
                                        checked={isChecked}
                                        onChange={() =>
                                            setIsChecked(!isChecked)
                                        }
                                    />
                                    Yes, I would like to receive communications
                                    by call / email about Company&#39;s
                                    services.
                                </p>
                                <p className='full-width'>
                                    <input
                                        type='submit'
                                        className='submit-btn'
                                        value='Submit'
                                    />
                                    <button
                                        className='reset-btn'
                                        type='button'
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </button>
                                </p>
                            </form>
                        </div>
                        <div className='contacts contact-wrapper'>
                            <ul>
                                <li>
                                    Welcome to Wasetak-Free, a freelance
                                    marketplace that connects talented
                                    freelancers with businesses and individuals
                                    looking for quality work. Our platform is
                                    designed to empower freelancers and provide
                                    them with the tools they need to succeed in
                                    today&#39;s digital world.
                                </li>
                                <span className='hightlight-contact-info'>
                                    <li className='email-info'>
                                        <i
                                            className='fa fa-envelope'
                                            aria-hidden='true'
                                        ></i>{" "}
                                        Wasetak_Free@gmail.com
                                    </li>
                                    <li>
                                        <i
                                            className='fa fa-phone'
                                            aria-hidden='true'
                                        ></i>{" "}
                                        <span className='highlight-text'>
                                            +02 0121314156
                                        </span>
                                    </li>
                                </span>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps() {
    // Load the CSS file
    const cssFilePath = path.join(
        process.cwd(),
        "styles",
        "css",
        "Contact.css"
    );
    const fileContent = await getCssData(cssFilePath);
    return { props: { fileContent } };
}
