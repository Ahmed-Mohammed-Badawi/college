import Head from "next/head";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import QuestionFilter from "@/components/QuestionsFilter";
import Question from "@/components/questionComponent";
import getCssData from "@/helpers/readCssFile";
import {logoutHandler} from "@/helpers/logoutHandler";
import {toast} from "react-toastify";
import axios from "axios";

//NODE
const path = require("path");

function Jobs({fileContent, user}) {

    // State
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    // ROUTER
    const router = useRouter();

    useEffect(() => {
        axios.get("/api/questions").then((res) => {
            console.log(res.data);

            // Create a new array with the posts from the object
            const Questions = Object.values(res.data);
            // Set the posts
            setQuestions(Questions);
        })
            .catch((err) => {
                toast.error(err.message || err.error || "Something went wrong while fetching the posts.");
            });
    }, []);


    // Search HANDLER
    const searchHandler = (data) => {
        // EXtract the data
        const {title} = data;

        // Filter the posts
        const filteredPosts = questions.filter((question) => {
            return (
                question.header.toLowerCase().includes(title.toLowerCase())
            );
        });

        // Set the posts
        setFilteredQuestions(filteredPosts);

        if(filteredPosts.length === 0){
            toast.info("No posts found with the given criteria.");
        }
    }


    const questionsToRender = filteredQuestions.length > 0 ? filteredQuestions : questions;

    return (
        <>
            <Head>
                <meta charSet='UTF-8'/>
                <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
                <title>Questions</title>
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
                            {user ? (
                                <>
                                    <li>
                                        <Link href='/profile'>Profile</Link>
                                    </li>
                                    <li>
                                        <Link href='#' onClick={async () => {
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
            <section className='container '>
                <div className='nav-list'>
                    <ul>
                        <li>
                            <Link href='/'>Wasetak-Free&emsp;{">"}</Link>
                        </li>
                        <li>
                            <Link href='/questions'>Questions&emsp;</Link>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='main-container'>
                <div className='filter'>
                    <QuestionFilter onFilter={(data) => searchHandler(data)}/>
                </div>
                <div className='posts'>
                    {questionsToRender && questionsToRender.map((question) => {
                        return (
                            <Question
                                key={question.pId}
                                title={question.header}
                                description={question.text}
                                id={question.pId}
                            />
                        );
                    })}
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

export async function getServerSideProps() {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "questions.css");
    const fileContent = await getCssData(cssFilePath);
    return {props: {fileContent}};
}
