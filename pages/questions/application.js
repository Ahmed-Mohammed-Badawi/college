import {useEffect, useId, useState} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import Comment from "@/components/comment";
import QuestionCommentForm from "@/components/questionCommentForm";
import getCssData from "@/helpers/readCssFile";
import React from "react";
import {logoutHandler} from "@/helpers/logoutHandler";
import {toast} from "react-toastify";
import axios from "axios";

//NODE
const path = require("path");

export default function Home({fileContent, user}) {

    const router = useRouter();

    // State
    const [question, setQuestion] = useState({});

    const [postId, setPostId] = useState(null);
    const [comments, setComments] = useState([]);

    // EFFECT TO GET THE POST DATA
    useEffect(() => {
        // GET THE ID FROM THE URL
        const {id} = router.query;
        setPostId(id);

        if (!id) {
            toast.error("No post found with the given id.");
            return;
        }

        axios.get(`/api/questions/getQuestion?id=${id}`).then((res) => {
            console.log(res.data);
            setQuestion(res.data);

            // Convert the Object of comments to an array
            if (res.data?.Comments) {
                const commentsArray = Object.values(res.data?.Comments || {});
                setComments(commentsArray);
            }
        })
            .catch((err) => {
                toast.error(err.response?.data?.error || "Something went wrong while fetching the posts.");
            });
    }, [router])

    // HANDLERS
    const refreshTheProposals = () => {
        axios.get(`/api/questions/getQuestion?id=${postId}`).then((res) => {
            console.log(res.data);
            setQuestion(res.data);

            // Convert the Object of comments to an array
            if (res.data?.Comments) {
                const commentsArray = Object.values(res.data?.Comments || {});
                setComments(commentsArray);
            }else {
                setComments([]);
            }
        })
            .catch((err) => {
                toast.error(err.response?.data?.error || "Something went wrong while fetching the posts.");
            });
    }


    return (
        <>
            <Head>
                <meta charSet='utf-8'/>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>New Company logo</title>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                />
                {/* <link rel='stylesheet' type='text/css' href='/css/post.css' /> */}
                <link
                    href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
                    rel='stylesheet'
                />
                <link
                    rel='stylesheet'
                    href='https://unpkg.com/boxicons@latest/css/boxicons.min.css'
                />
                {/* <script defer src='/JS/post.js'></script> */}
                <meta charSet='UTF-8'/>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon-32x32.png'
                />
                <title>Frontend Mentor | Interactive comments section</title>
                <style
                    dangerouslySetInnerHTML={{__html: fileContent}}
                ></style>
            </Head>

            <header>
                <nav>
                    <div className='nav-bar1'>
                        <ul>
                            <li>Wasetak FREE</li>
                            <li>
                                <Link href='#'>How it Works?</Link>
                            </li>
                            <li>
                                <Link href='#'>Browse Jobs </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='nav-bar2'>
                        <ul style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "1rem",
                            listStyle: "none",
                            paddingRight: "1rem",
                        }}>
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
                                            } else {
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
            <div className='title'>
                <div className='title-a'>
                    <h1>{question?.header}</h1>
                </div>
            </div>
            <div className='nav-list'>
                <ul>
                    <li>
                        <Link href='/'>Wasetak-Free&emsp;{">"}</Link>
                    </li>
                    <li>
                        <Link href='/jobs'>Jobs&emsp;{">"}</Link>
                    </li>
                    <li>
                        <Link href='#'>Post &emsp;{">"}</Link>
                    </li>
                    <li>
                        <Link href='#'>{question?.header}</Link>
                    </li>
                </ul>
            </div>
            <div className='main-contaner'>
                <h1 style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                }}>Question Description:</h1>
                <p className='description'>
                    {question?.text}
                </p>
                <br/>
                <br/>
                <hr/>
                <br/>
                <br/>
                <div>
                    <h4 style={{
                        fontSize: ".9rem",
                    }}>ATTACHMENTS</h4>
                    {(question?.meme !== "" && question?.meme !== "noImage") && (<Link href={question?.meme || ''} style={{
                        color: "#333333",
                        textDecoration: "underline",
                        fontSize: ".8rem",
                        padding: ".5rem 1rem",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "5px",
                        display: "inline-block",
                        width: "100%",
                        marginTop: ".5rem",
                        marginBottom: ".5rem",
                        // Make it max height 2 lines
                        maxHeight: "3rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}>{question?.meme || ''}</Link>)}
                </div>
                <br/>
                <br/>
                <div className='About-the-Client'>
                    <h2 style={{textTransform: "uppercase"}}> about the questioner : </h2>
                    <div className='c-userr'>
                        <Image
                            src={question?.user?.photo || '/images/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg'}
                            alt=''
                            className='usrr-imgg'
                            width={300}
                            height={300}
                        />
                        <p className='usr-name'>{question?.user?.name || "Creator name"}</p>
                    </div>
                </div>
            </div>
            <div className='comments_section'>
                <h2 className='comments_section__h2'>Comments</h2>
                {(user && user?.uid !== question?.id) && <QuestionCommentForm questionId={postId} refreshTheProposals={refreshTheProposals}/>}
                {(comments && comments.length > 0) && comments.map((comment, index) => {
                    return (
                        <Comment
                            userId={comment?.id}
                            key={comment.cId + index}
                            proposalId={comment?.cId}
                            postId={postId}
                            freelancer={comment?.mane || "Freelancer name"}
                            text={comment?.comment}
                            imageUrl={comment?.dp || `https://via.placeholder.com/150`}
                            user={user}
                            refreshTheProposals={refreshTheProposals}
                        />
                    )
                })}
            </div>
        </>
    );
}

export async function getServerSideProps() {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "question.css");
    const fileContent = await getCssData(cssFilePath);
    return {props: {fileContent}};
}
