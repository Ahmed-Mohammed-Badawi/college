// FRAMEWORK
import React, {useEffect, useState} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
// COMPONENTS
import Proposal from "@/components/proposal";
import ProposalForm from "@/components/proposalForm";
import BuyButton from "@/components/BuyButton/BuyButton";
// HELPERS
import getCssData from "@/helpers/readCssFile";
import {logoutHandler} from "@/helpers/logoutHandler";
import axios from "axios";
// NOTIFICATIONS
import {toast} from "react-toastify";

//NODE MODULES TO GET THE CSS FILE
const path = require("path");

export default function Home({fileContent, user}) {

    const router = useRouter();

    // State
    const [post, setPost] = useState({});
    const [postId, setPostId] = useState(null);
    const [comments, setComments] = useState([]);

    // REFS
    const BuyButtonRef = React.useRef(null);

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

    // EFFECT TO CHECK IF THE POST IS ALREADY BOUGHT OR NOT
    useEffect(() => {
        // GET THE ID FROM THE URL
        const {id} = router.query;
        // Check if the user is logged in
        if (!user) return;

        // CHECK IF THE POST IS ALREADY BOUGHT
        const boughtPosts = JSON.parse(localStorage.getItem("boughtPosts")) || [];
        const isBought = boughtPosts.find((post) => post.id === id);
        if (isBought && BuyButtonRef.current) {
            // ADD THE CLASS Active TO THE BUTTON
            BuyButtonRef.current.classList.add("Active");
        }

    }, [router, user]);


    // HANDLERS
    const refreshTheProposals = () => {
        axios.get(`/api/posts/getPost?id=${postId}`).then((res) => {
            setPost(res.data);

            // Convert the Object of comments to an array
            if (res.data?.Comments) {
                const commentsArray = Object.values(res.data?.Comments || {});
                setComments(commentsArray);
            } else {
                setComments([]);
            }
        })
            .catch((err) => {
                toast.error(err.response?.data?.error || "Something went wrong while fetching the posts.");
            });
    }

    // HANDLERS
    const BuyHandler = () => {
        // GET THE ID FROM THE URL
        const {id} = router.query;
        // Check if the user is logged in
        if (!user) {
            toast.error("You need to login first.");
            return;
        }

        // Save the post id in the local storage in object that contains all the bought posts where every post has the id and title and price
        const boughtPosts = JSON.parse(localStorage.getItem("boughtPosts")) || [];
        const item = {
            id,
            title: post?.project_name,
            price: post?.cost,
        }

        // Check if the post is already bought
        const isBought = boughtPosts.find((post) => post.id === item.id);
        if (isBought) {
            if (confirm("Are you sure you want to remove this post from the bought posts?") === false) return;
            // Remove the post from the bought posts
            const newBoughtPosts = boughtPosts.filter((post) => post.id !== item.id);
            localStorage.setItem("boughtPosts", JSON.stringify(newBoughtPosts));

            // Show a message
            toast.success("The post has been removed from the bought posts.");

            // REMOVE THE CLASS Active FROM THE BUTTON
            BuyButtonRef.current.classList.remove("Active");

            return;
        }

        boughtPosts.push(item);
        localStorage.setItem("boughtPosts", JSON.stringify(boughtPosts));

        // Show a message
        toast.success("The post has been added to the bought posts.");

        // ADD THE CLASS Active TO THE BUTTON
        if (BuyButtonRef.current) {
            BuyButtonRef.current.classList.add("Active");
        }
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
                <meta charSet='UTF-8'/>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
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
                        <ul style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "1rem",
                            listStyle: "none",
                            paddingRight: ".5rem",
                        }}>
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
                                            } else {
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
                    <h1>{post?.project_name}</h1>
                </div>
                <div className={'Buy_Price'} onClick={BuyHandler}>
                    {(user && user?.uid !== post?.id) && (<button type={"button"} className={"Buy_icon"} ref={BuyButtonRef}>
                        <BuyButton/>
                    </button>)}
                    <div className={'budget'}>
                        <h1>Budget:</h1>
                        <h1>${post?.cost} USD</h1>
                    </div>
                </div>
            </div>
            <div className='nav-list'>
                <ul>
                    <li>
                        <Link href='/'>Wasetak-Free &emsp;{">"}</Link>
                    </li>
                    <li>
                        <Link href='/jobs'>Jobs &emsp;{">"}</Link>
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
                    <div className='c-userr'>
                        <Image
                            src={post?.db || '/images/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg'}
                            alt=''
                            className='usrr-imgg'
                            width={300}
                            height={300}
                        />
                        <div>
                            <p className='usr-name'>{post?.name || "Creator name"}</p>
                            <span className={'usr-creator'}>CREATOR</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='comments_section'>
                <h2 className='comments_section__h2'>Proposals</h2>
                {(user && user?.uid !== post?.id) &&
                    <ProposalForm postId={postId} refreshTheProposals={refreshTheProposals}/>}
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
    )
        ;
}

export async function getServerSideProps() {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "post.css");
    const fileContent = await getCssData(cssFilePath);
    return {props: {fileContent}};
}
