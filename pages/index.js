// FRAMEWORK
import React from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
// HELPERS
import getCssData from "@/helpers/readCssFile";
import {logoutHandler} from "@/helpers/logoutHandler";

import BuyButton from "@/components/BuyButton/BuyButton";

//NODE MODULES TO READ STYLE FILE
const path = require("path");

// NOTIFICATION
import {toast} from "react-toastify";

const HomePage = ({fileContent, user}) => {

    // ROUTER
    const router = useRouter();

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

                <link
                    href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
                    rel='stylesheet'
                />

                <link
                    rel='stylesheet'
                    href='https://unpkg.com/boxicons@latest/css/boxicons.min.css'
                />

                {/* <link rel='stylesheet' type='text/css' href='/css/home.css' /> */}

                <link rel='preconnect' href='https://fonts.googleapis.com'/>
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin="true"
                />
                <script src='/JS/script.js' defer></script>
                <style
                    dangerouslySetInnerHTML={{__html: fileContent}}
                ></style>
            </Head>
            <header className='head'>
                <Script
                    src='https://kit.fontawesome.com/44f50e4aac.js'
                    crossorigin='true'
                ></Script>

                <nav className='head-nav'>
                    <div className='nav-bar1'>
                        <ul>
                            <li onClick={() => router.push('/')} style={{cursor: 'pointer'}}>Wasetak FREE</li>
                            <li>
                                <Link href='#'>How it Works?</Link>
                            </li>
                            <li>
                                <Link href='/jobs'>Browse Jobs </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='nav-bar2'>
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

                                            /*REMOVE THE ITEMS*/
                                            localStorage.removeItem('boughtPosts')

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
                                    <li className={"li__cart__container"}>
                                        <Link href='/jobs/cart' className={"cart__container"}><span><BuyButton /></span> Cart </Link>
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
                    <div className='nav'>
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
            {/* // <!-- End header --> */}

            {/* // <!-- Start Section 2 --> */}
            <section className='hire'>
                <video autoPlay loop muted className='back-vid'>
                    <source
                        src='/images/production ID-4496268.mp4'
                        type='video/mp4'
                    />
                </video>

                <h1 className='h1'>
                    Hire the best freelancers for any job, online.
                </h1>
                <ul>
                    <li>Any job you can possibly think of</li>
                    <li>Pay only when you&#39;re 100% happy</li>
                    <li>FREE 100%</li>
                </ul>
                <div className='hire-btu'>
                    <Link href='/freelancer/hire'>
                        {" "}
                        <button className='btu1'>Hire a Freelancer</button>
                        {" "}
                    </Link>
                    <Link href='/jobs'>
                        {" "}
                        <button className='btu2'>
                            Earn Money Freelancing{" "}
                        </button>
                    </Link>
                </div>
            </section>

            {/* <!-- End section 2 -->
        <!-- Start hire-freelancer  --> */}

            <section className='hire-freelancer' id='yalla'>
                <div className='hire-title' id='hire-freelancer'>
                    <h1>Need something done?</h1>
                </div>
                <div className='yalla'>
                    <div className='cards-hire-freelancer'>
                        <div className='container1'>
                            <svg
                                width='128'
                                height='128'
                                viewBox='0 0 128 128'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='svg'
                            >
                                <path
                                    d='M63.99 89.213v16.537M104.676 32.862H23.324l.12 56.231h81.351l-.119-56.23z'
                                    stroke='#007FED'
                                    strokeWidth='4'
                                    strokeMiterlimit='10'
                                />
                                <path
                                    d='M84.75 75.436l-.06-23.063-21.693.029-7.41-5.918h-10.52v28.952H84.75zM50.951 67.92h11.552M50.3 104.719h27.13'
                                    stroke='#007FED'
                                    strokeWidth='4'
                                    strokeMiterlimit='10'
                                />
                            </svg>
                            <h4 className='card-header1'>
                                <b>Post a job</b>
                            </h4>
                            <p className='text-card'>
                                It’s free and easy to post a job. Simply fill in
                                a title, description and budget and competitive
                                bids come within minutes.
                            </p>
                        </div>
                    </div>
                    <div className='cards-hire-freelancer'>
                        <svg
                            width='128'
                            height='128'
                            viewBox='0 0 128 128'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='svg'
                        >
                            <path
                                d='M94.867 70.112V95.22H32.885V54.26h61.982v15.851zM63.876 41.076c6.007 0 10.877-4.87 10.877-10.877 0-6.007-4.87-10.877-10.877-10.877C57.87 19.322 53 24.192 53 30.2c0 6.007 4.87 10.877 10.877 10.877zM46.794 54.975a19.345 19.345 0 0134.208 0'
                                stroke='#007FED'
                                strokeWidth='4'
                                strokeMiterlimit='10'
                            />
                            <path
                                d='M63.893 94.809v11.937m-9.677 0h19.32'
                                stroke='#007FED'
                                strokeWidth='4'
                            />
                            <path
                                d='M63.876 77.221a2.29 2.29 0 100-4.58 2.29 2.29 0 000 4.58z'
                                fill='#007FED'
                            />
                        </svg>
                        <div className='container1'>
                            <h4 className='card-header1'>
                                <b>Choose freelancers</b>
                            </h4>
                            <p className='text-card'>
                                No job is too big or too small. We&#39;ve got
                                freelancers for jobs of any size or budget,
                                across 1800+ skills. No job is too complex. We
                                can get it done!
                            </p>
                        </div>
                    </div>
                    <div className='cards-hire-freelancer'>
                        <svg
                            width='128'
                            height='128'
                            viewBox='0 0 128 128'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='svg'
                        >
                            <path
                                d='M100.611 72.383c0 19.865-36.76 34.873-36.76 34.873S27.088 92.268 27.088 72.383l.2-39.828 37.06-11.911 36.462 11.59-.2 40.15zM63.882 63.155a5.765 5.765 0 115.764-5.765M63.882 63.154a5.764 5.764 0 11-5.765 5.765M63.882 45.86v5.765M63.882 80.448v-5.764'
                                stroke='#007FED'
                                strokeWidth='4'
                                strokeMiterlimit='10'
                            />
                        </svg>
                        <div className='container1'>
                            <h4 className='card-header1'>
                                <b>Pay safely</b>
                            </h4>
                            <p className='text-card'>
                                {" "}
                                Only pay for work when it has been completed and
                                you&#39;re 100% satisfied with the quality using
                                our milestone payment system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- end hire-freelancer  --> */}
            <hr/>
            {/* <!-- start  new section(3) --> */}
            <section className='services'>
                <div className='services-titel'>
                    <h1>Popular professional services</h1>
                    <h4>categories </h4>
                </div>
                <div className='slider'>
                    <div className='slider-container'>
                        <div className='scrollbar' id='style-2'>
                            <div className='force-overflow'></div>
                        </div>
                        <div className='ser-cards'>
                            <Link href='#'>
                                <Image
                                    src='/images/clement-helardot-95YRwf6CNw8-unsplash.jpg'
                                    className='img-ss'
                                    alt=''
                                    width={315}
                                    height={210}
                                />
                                <h2 className='ser-card-text'>
                                    Websites, IT & Software
                                </h2>
                                <h4 className='ser-card-catg'>
                                    {" "}
                                    PHP, HTML, WordPress, JavaScript, Software
                                    Architecture...
                                </h4>
                            </Link>
                        </div>
                        <div className='ser-cards'>
                            <Link href='#'>
                                <Image
                                    src='/images/jakob-owens-l82NzBSYbj0-unsplash.jpg'
                                    className='img-ss'
                                    alt=''
                                    width={315}
                                    height={210}
                                />
                                <h2 className='ser-card-text'>
                                    Design, Media & Architecture
                                </h2>
                                <h4 className='ser-card-catg'>
                                    {" "}
                                    Graphic Design, Website Design, Photoshop,
                                    Logo Design, Illustrator...
                                </h4>
                            </Link>
                        </div>
                        <div className='ser-cards'>
                            <Link href='#'>
                                <Image
                                    src='/images/5726840.jpg'
                                    className='img-ss'
                                    alt=''
                                    width={315}
                                    height={210}
                                />
                                <h2 className='ser-card-text'>
                                    Mobile Phones & Computing
                                </h2>
                                <h4 className='ser-card-catg'>
                                    {" "}
                                    Mobile App Development, Android, iPhone,
                                    iPad, Kotlin..
                                </h4>
                            </Link>
                        </div>
                        <div className='ser-cards'>
                            <Link href='#'>
                                <Image
                                    src='/images/trent-erwin-UgA3Xvi3SkA-unsplash.jpg'
                                    className='img-ss'
                                    alt=''
                                    width={315}
                                    height={210}
                                />
                                <h2 className='ser-card-text'>
                                    Writing & Content
                                </h2>
                                <h4 className='ser-card-catg'>
                                    {" "}
                                    Article Writing, Content Writing,
                                    Copywriting, Research Writing,
                                    Ghostwriting...
                                </h4>
                            </Link>
                        </div>
                        <div className='ser-cards'>
                            <Link href='#'>
                                <Image
                                    src='/images/campaign-creators-pypeCEaJeZY-unsplash.jpg'
                                    className='img-ss'
                                    alt=''
                                    width={315}
                                    height={210}
                                />
                                <h2 className='ser-card-text'>
                                    Data Entry & Admin{" "}
                                </h2>
                                <h4 className='ser-card-catg'>
                                    Data Entry, Excel, Data Processing, Web
                                    Search, Customer Support...{" "}
                                </h4>
                            </Link>
                        </div>
                        <div className='ser-cards'>
                            <Link href='#'>
                                <Image
                                    src='/images/thisisengineering-raeng-32PpagSzeGs-unsplash.jpg'
                                    className='img-ss'
                                    alt=''
                                    width={315}
                                    height={210}
                                />
                                <h2 className='ser-card-text'>
                                    Engineering & Science
                                </h2>
                                <h4 className='ser-card-catg'>
                                    AutoCAD, CAD/CAM, Engineering, Machine
                                    Learning (ML), Data Mining...{" "}
                                </h4>
                            </Link>
                        </div>
                    </div>
                </div>
                <button className='btn-ser'> See More</button>
            </section>

            <div className='gs-footerMainConatiner' id='footer'>
                <div className='gs-footerDataContainer'>
                    <div className='gs-footerInnerContainer'>
                        <div className='gs-about-us'>
                            <div className='gs-footHeader'>About Us</div>
                            <div className='gs-footBody'>
                                Welcome to Wasetak-Free, a freelance marketplace
                                that connects talented freelancers with
                                businesses and individuals looking for quality
                                work. Our platform is designed to empower
                                freelancers and provide them with the tools they
                                need to succeed in today&#39;s digital world.{" "}
                            </div>
                        </div>
                        <div className='gs-fotLinks'>
                            <div className='gs-footHeader'>Links</div>
                            <div className='gs-footBody'>
                                <ul className='gs-links-list'>
                                    <li>
                                        <Link href='/freelancer/hire'>
                                            Hire a Freelancer
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/jobs'>projects</Link>
                                    </li>
                                    <li>
                                        <Link href='/about_us'>About</Link>
                                    </li>
                                    <li>
                                        <Link href='/contact'>Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='gs-fotLinks'>
                            <div className='gs-footHeader'>Categories</div>
                            <div className='gs-footBody'>
                                <ul className='gs-links-list'>
                                    <li>Websites, IT & Software</li>
                                    <li>Design, Media & Architecture</li>
                                    <li>Mobile Phones & Computing</li>
                                    <li>Writing & Content</li>
                                    <li>Engineering & Science</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className='gs-footerHr'/>
                    <div className='gs-footerInnerContainer'>
                        <div className='gs-fotter-left'>
                            Copyright © 2022 All Rights Reserved by{" "}
                            Wasetak.Free.
                        </div>
                        <div className='gs-fotter-right'>
                            <a className='gs-social-icon'>
                                <svg
                                    version='1.1'
                                    id='Capa_1'
                                    xmlns='http://www.w3.org/2000/svg'
                                    // xmlns:xlink='http://www.w3.org/1999/xlink'
                                    x='0px'
                                    y='0px'
                                    viewBox='0 0 23.101 23.101'
                                    style={
                                        {
                                            // enableBackground: `new 0 0 23.101 23.101;`,
                                        }
                                    }
                                    // xml:space='preserve'
                                >
                                    <g>
                                        <path
                                            d='M8.258,4.458c0-0.144,0.02-0.455,0.06-0.931c0.043-0.477,0.223-0.976,0.546-1.5c0.32-0.522,0.839-0.991,1.561-1.406 C11.144,0.208,12.183,0,13.539,0h3.82v4.163h-2.797c-0.277,0-0.535,0.104-0.768,0.309c-0.231,0.205-0.35,0.4-0.35,0.581v2.59h3.914 c-0.041,0.507-0.086,1-0.138,1.476l-0.155,1.258c-0.062,0.425-0.125,0.819-0.187,1.182h-3.462v11.542H8.258V11.558H5.742V7.643 h2.516V4.458z'/>
                                    </g>
                                </svg>
                            </a>
                            <a className='gs-social-icon'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
                                </svg>
                            </a>
                            <a className='gs-social-icon'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
                                </svg>
                            </a>
                            <a className='gs-social-icon'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        d='M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z'/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end  section(4) --> */}
        </>
    );
};

export default HomePage;

export async function getServerSideProps() {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "home.css");
    const fileContent = await getCssData(cssFilePath);
    return {props: {fileContent}};
}
