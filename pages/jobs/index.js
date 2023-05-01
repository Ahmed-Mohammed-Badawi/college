import Head from "next/head";
import React from "react";
import Link from "next/link";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectComponent from "@/components/projectComponent";
import getCssData from "@/helpers/readCssFile";

//NODE
const path = require("path");

function Jobs({ fileContent }) {
    return (
        <>
            <Head>
                <meta charSet='UTF-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
                <title>jobs</title>
                {/* <link rel='stylesheet' type='text/css' href='/css/job.css' /> */}
                {/* <script src='/JS/job.js' defer></script> */}
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                />
                {/* <script src="https://kit.fontawesome.com/44f50e4aac.js" crossOrigin="anonymous"></script> */}
                <link
                    href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
                    rel='stylesheet'
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
            <header className='head'>
                <nav className='head-nav'>
                    <div className='nav-bar1'>
                        <ul>
                            <li>Wasetak FREE</li>
                            <li>
                                <Link href='#yalla'>How it Works?</Link>
                            </li>
                            <li>
                                <Link href='/jobs'>Browse Jobs</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='nav-bar2'>
                        <ul>
                            <li>
                                <Link href='/login'>Log In</Link>
                            </li>
                            <li>
                                <Link href='/registration'>Sign Up</Link>
                            </li>
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
                                <Link href='/about_us'>About</Link>
                            </li>
                            <li>
                                <Link href='/contact'>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
            <section className='container '>
                <div className='nav-list'>
                    <ul>
                        <li>
                            <Link href='/'>Wasetak-Free&emsp;{">"}</Link>
                        </li>
                        <li>
                            <Link href='/jobs'>Jobs&emsp;</Link>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='main-container'>
                <div className='filter'>
                    <ProjectFilter />
                </div>
                <div className='posts'>
                    <ProjectComponent />
                    <ProjectComponent />
                    <ProjectComponent />
                    <ProjectComponent />
                    <ProjectComponent />
                    <ProjectComponent />
                    <ProjectComponent />
                    <div className='pagination'>
                        <Link href='#'>&laquo;</Link>
                        <Link className='active' href='#'>
                            1
                        </Link>
                        <Link href='#'>2</Link>
                        <Link href='#'>3</Link>
                        <Link href='#'>4</Link>
                        <Link href='#'>5</Link>
                        <Link href='#'>6</Link>
                        <Link href='#'>&gt;</Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Jobs;

export async function getServerSideProps(context) {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "job.css");
    const fileContent = await getCssData(cssFilePath);
    return { props: { fileContent } };
}
