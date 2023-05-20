import {useEffect, useState} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import Proposal from "@/components/proposal";
import ProposalForm from "@/components/proposalForm";
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
    const [post, setPost] = useState({});
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

        axios.get(`/api/posts/getPost?id=${id}`).then((res) => {
            console.log(res.data);
            setPost(res.data);

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
        axios.get(`/api/posts/getPost?id=${postId}`).then((res) => {
            console.log(res.data);
            setPost(res.data);

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
                                <Link href='/questions'>
                                    Ask a Question
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
            <div className='title'>
                <div className='title-a'>
                    <h1>{post?.project_name}</h1>
                </div>
                <div className='budget'>
                    <h1>Budget:</h1>
                    <h1>${post?.cost} USD</h1>
                </div>
            </div>
            <div className='nav-list'>
                <ul>
                    <li>
                        <Link href='/main'>Wasetak-Free&emsp;{">"}</Link>
                    </li>
                    <li>
                        <Link href='/jobs'>Jobs&emsp;{">"}</Link>
                    </li>
                    <li>
                        <Link href='#'>Post &emsp;{">"}</Link>
                    </li>
                    <li>
                        <Link href='#'>{post?.project_name}</Link>
                    </li>
                </ul>
            </div>
            <div className='main-contaner'>
                <h1 style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                }}>Job Description:</h1>
                <p className='description'>
                    {post?.text}
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
                    {post?.meme && (<Link href={post?.meme || ''} style={{
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
                    }}>{post?.meme || ''}</Link>)}
                </div>
                <br/>
                <br/>
                <div className='About-the-Client'>
                    <h2> About the Client: </h2>
                    <div className='c-userr'>
                        <Image
                            src={post?.db || '/images/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg'}
                            alt=''
                            className='usrr-imgg'
                            width={300}
                            height={300}
                        />
                        <p className='usr-name'>{post?.name || "Creator name"}</p>
                    </div>
                    <div>
                        <fieldset className='rating'>
                            <input
                                type='radio'
                                id='star5'
                                name='rating'
                                value='5'
                            />
                            <label
                                className='full'
                                htmlFor='star5'
                                title='Awesome - 5 stars'
                            ></label>
                            <input
                                type='radio'
                                id='star4half'
                                name='rating'
                                value='4 and a half'
                            />
                            <label
                                className='half'
                                htmlFor='star4half'
                                title='Pretty good - 4.5 stars'
                            ></label>
                            <input
                                type='radio'
                                id='star4'
                                name='rating'
                                value='4'
                            />
                            <label
                                className='full'
                                htmlFor='star4'
                                title='Pretty good - 4 stars'
                            ></label>
                            <input
                                type='radio'
                                id='star3half'
                                name='rating'
                                value='3 and a half'
                            />
                            <label
                                className='half'
                                htmlFor='star3half'
                                title='Meh - 3.5 stars'
                            ></label>
                            <input
                                type='radio'
                                id='star3'
                                name='rating'
                                value='3'
                            />
                            <label
                                className='full'
                                htmlFor='star3'
                                title='Meh - 3 stars'
                            ></label>
                            <input
                                type='radio'
                                id='star2half'
                                name='rating'
                                value='2 and a half'
                            />
                            <label
                                className='half'
                                htmlFor='star2half'
                                title='Kinda bad - 2.5 stars'
                            ></label>
                            <input
                                type='radio'
                                id='star2'
                                name='rating'
                                value='2'
                            />
                            <label
                                className='full'
                                htmlFor='star2'
                                title='Kinda bad - 2 stars'
                            ></label>
                            <input
                                type='radio'
                                id='star1half'
                                name='rating'
                                value='1 and a half'
                            />
                            <label
                                className='half'
                                htmlFor='star1half'
                                title='Meh - 1.5 stars'
                            ></label>
                            <input
                                type='radio'
                                id='star1'
                                name='rating'
                                value='1'
                            />
                            <label
                                className='full'
                                htmlFor='star1'
                                title='Sucks big time - 1 star'
                            ></label>
                            <input
                                type='radio'
                                id='starhalf'
                                name='rating'
                                value='half'
                            />
                            <label
                                className='half'
                                htmlFor='starhalf'
                                title='Sucks big time - 0.5 stars'
                            ></label>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div className='comments_section'>
                <h2 className='comments_section__h2'>Proposals</h2>
                {(user && user?.uid !== post?.id) && <ProposalForm postId={postId} refreshTheProposals={refreshTheProposals}/>}
                {(comments && comments.length > 0) && comments.map((comment) => {
                    return (
                        <Proposal
                            userId={comment?.id}
                            key={comment.cId}
                            proposalId={comment?.cId}
                            postId={postId}
                            freelancer={comment?.mane || "Freelancer name"}
                            text={comment?.comment}
                            imageUrl={comment?.dp || `https://via.placeholder.com/150`}
                            days={comment?.days}
                            cost={comment?.cost}
                            user={user}
                            refreshTheProposals={refreshTheProposals}
                        />
                    )
                })}
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "post.css");
    const fileContent = await getCssData(cssFilePath);
    return {props: {fileContent}};
}
