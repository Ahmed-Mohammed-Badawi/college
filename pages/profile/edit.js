// FRAMEWORK
import React, {useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
// HELPERS
import getCssData from "@/helpers/readCssFile";
import axios from "axios";
import {toast} from "react-toastify";
import {logoutHandler} from "@/helpers/logoutHandler";
// COMPONENTS
import Spinner from "@/components/spinner/Spinner";

//NODE
const path = require("path");

function Profile({fileContent, user}) {

    // ROUTER
    const router = useRouter();

    // STATES
    const [loading, setLoading] = React.useState(false); // loading state
    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [country, setCountry] = React.useState("");

    const [userData, setUserData] = React.useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) {
                router.push("/login")
                    .then(() => {
                        toast.error("You must be logged in to access this page");
                    })
            }
        }, 2000)

        return () => clearTimeout(timer);
    }, [user, router])


    useEffect(() => {
        axios
            .get("/api/user/get")
            .then((res) => {
                setFullName(res.data.name);
                setUserName(res.data.username);
                setBio(res.data.bio);
                setCountry(res.data.country);

                setUserData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // SUBMIT HANDLER
    const submitHandler = (e) => {
        e.preventDefault();

        setLoading(true);
        axios
            .put("/api/user/update", {
                name: fullName,
                username: userName,
                bio,
                country,
            })
            .then((_) => {
                setLoading(false);
                toast.success("Profile updated successfully");
                router.push("/profile");
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                toast.error(err?.response?.data?.message || err?.message || "Something went wrong");
            });
    };

    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
                <title>Profile</title>
                {/*<link*/}
                {/*    rel='stylesheet'*/}
                {/*    href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css'*/}
                {/*    integrity='sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N'*/}
                {/*    crossOrigin='true'*/}
                {/*/>*/}
                <style
                    dangerouslySetInnerHTML={{__html: fileContent}}
                ></style>
            </Head>
            <div>
                <header>
                    <nav>
                        <div className='nav-bar1'>
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
                        <div className='nav-bar2'>
                            <div className='dropdown'>
                                <Image
                                    width={48}
                                    height={48}
                                    alt='...'
                                    className='profile_imgg'
                                    src='/images/icons8-person-48.png'
                                />
                                <button className='profile-btu'>Profile</button>
                                <div className='dropdown-options'>
                                    <Link href='/profile'>Dashboard</Link>
                                    <Link href='/profile/edit'>Setting</Link>
                                    <Link href='#' onClick={async (event) => {
                                        event.preventDefault();
                                        const status = await logoutHandler();

                                        /*REMOVE THE ITEMS*/
                                        localStorage.removeItem('boughtPosts')

                                        if (status) {
                                            router.push("/")
                                                .then(() => {
                                                    router.reload();
                                                })
                                        } else {
                                            toast.error("Something went wrong while logging out");
                                        }
                                    }}>Logout</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <section className='nav'>
                        <div>
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
                <div className='nav-list'>
                    <ul>
                        <li>
                            <Link href='/'>Wasetak-Free&emsp;{">"}</Link>
                        </li>
                        <li>
                            <Link href='/profile'>user profile&emsp;{">"}</Link>
                        </li>
                        <li>
                            <Link href='/profile/edit'>Edit profile</Link>
                        </li>
                    </ul>
                </div>
                <div
                    className='container'
                    style={{minHeight: `calc(100vh - 187px)`}}
                >
                    <div className='main-body'>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='d-flex flex-column align-items-center text-center'>
                                            <div className='userImg_container'>
                                                <Image
                                                    width={80}
                                                    height={80}
                                                    src={(userData && userData.photo) ? userData.photo : '/images/icons8-person-48.png'}
                                                    alt='Admin'
                                                    className='rounded-circle'
                                                />
                                            </div>
                                            <div className='mt-3'>
                                                <h4>{userData?.name || 'Name'}</h4>
                                                <p className='text-secondary mb-1'>
                                                    {userData?.username || 'Username'}
                                                </p>
                                                <p className='text-muted font-size-sm'>
                                                    {userData && userData.country}
                                                </p>
                                            </div>
                                        </div>
                                        <hr className='my-4'/>
                                        <ul className='list-group list-group-flush'>
                                            <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                                                <h6 className='mb-0'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        className='feather feather-globe me-2 icon-inline'
                                                    >
                                                        <circle
                                                            cx='12'
                                                            cy='12'
                                                            r='10'
                                                        ></circle>
                                                        <line
                                                            x1='2'
                                                            y1='12'
                                                            x2='22'
                                                            y2='12'
                                                        ></line>
                                                        <path
                                                            d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'></path>
                                                    </svg>
                                                    Website
                                                </h6>
                                                <span className='text-secondary'>
                                                    https://Wasetak-Free.com
                                                </span>
                                            </li>
                                            <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                                                <h6 className='mb-0'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2"
                                                         strokeLinecap="round" strokeLinejoin="round"
                                                         className="feather feather-youtube">
                                                        <path
                                                            d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                                        <polygon
                                                            points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                                    </svg>
                                                    <span style={{
                                                        marginLeft: '10px',
                                                        display: "inline-block"
                                                    }}>Youtube</span>
                                                </h6>
                                                <span className='text-secondary'>
                                                    @Wasetak-Free
                                                </span>
                                            </li>
                                            <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                                                <h6 className='mb-0'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        className='feather feather-twitter me-2 icon-inline text-info'
                                                    >
                                                        <path
                                                            d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'></path>
                                                    </svg>
                                                    <span style={{
                                                        marginLeft: '10px',
                                                        display: "inline-block"
                                                    }}>Twitter</span>
                                                </h6>
                                                <span className='text-secondary'>
                                                    @Wasetak-Free
                                                </span>
                                            </li>
                                            <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                                                <h6 className='mb-0'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="#0077b5"
                                                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                         className="feather feather-linkedin">
                                                        <path
                                                            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                        <rect x="2" y="9" width="4" height="12"></rect>
                                                        <circle cx="4" cy="4" r="2"></circle>
                                                    </svg>
                                                    <span style={{
                                                        marginLeft: '10px',
                                                        display: "inline-block"
                                                    }}>Linkedin</span>
                                                </h6>
                                                <span className='text-secondary'>
                                                @Wasetak-Free
                                            </span>
                                            </li>
                                            <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                                                <h6 className='mb-0'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        className='feather feather-facebook me-2 icon-inline text-primary'
                                                    >
                                                        <path
                                                            d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
                                                    </svg>
                                                    <span style={{
                                                        marginLeft: '10px',
                                                        display: "inline-block"
                                                    }}>Facebook</span>
                                                </h6>
                                                <span className='text-secondary'>
                                                    @Wasetak-Free
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='row mb-3'>
                                            <div className='col-sm-3'>
                                                <h6 className='mb-0'>Full Name</h6>
                                            </div>
                                            <div className='col-sm-9 text-secondary'>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={fullName}
                                                    onChange={(e) => {
                                                        setFullName(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-sm-3'>
                                                <h6 className='mb-0'>Username</h6>
                                            </div>
                                            <div className='col-sm-9 text-secondary'>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={userName}
                                                    onChange={(e) => {
                                                        setUserName(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-sm-3'>
                                                <h6 className='mb-0'>Bio</h6>
                                            </div>
                                            <div className='col-sm-9 text-secondary'>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={bio}
                                                    onChange={(e) => {
                                                        setBio(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className='row mb-3'>
                                            <div className='col-sm-3'>
                                                <h6 className='mb-0'>Link</h6>
                                            </div>
                                            <div className='col-sm-9 text-secondary'>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value='(012) 131415166'
                                                />
                                            </div>
                                        </div> */}
                                        <div className='row mb-3'>
                                            <div className='col-sm-3'>
                                                <h6 className='mb-0'>Country</h6>
                                            </div>
                                            <div className='col-sm-9 text-secondary'>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={country}
                                                    onChange={(e) => {
                                                        setCountry(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className='row mb-3'>
                                            <div className='col-sm-3'>
                                                <h6 className='mb-0'>Message</h6>
                                            </div>
                                            <div className='col-sm-9 text-secondary'>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value='Heliopolis, Cairo, EG'
                                                />
                                            </div>
                                        </div> */}
                                        <div className='row'>
                                            <div className='col-sm-3'></div>
                                            <div className='col-sm-9 text-secondary'>
                                                <button
                                                    type='button'
                                                    className='btn btn-primary px-4'
                                                    onClick={submitHandler}
                                                >
                                                    {loading ? (
                                                        <Spinner
                                                            size={0.5}
                                                            color={"#ff5500"}
                                                        />
                                                    ) : (
                                                        "Edit"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;

export async function getServerSideProps() {
    // Load the CSS file
    const cssFilePath = path.join(
        process.cwd(),
        "styles",
        "css",
        "profile.css"
    );
    const fileContent = await getCssData(cssFilePath);
    return {props: {fileContent}};
}
