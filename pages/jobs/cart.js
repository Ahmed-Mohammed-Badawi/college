// pages/CartPage.js
import React, {useEffect, useState} from 'react';
import styles from '@/styles/css/cart.module.scss';
import Head from "next/head";
import Link from "next/link";
import {logoutHandler} from "@/helpers/logoutHandler";
import {toast} from "react-toastify";
import path from "path";
import getCssData from "@/helpers/readCssFile";
import {useRouter} from "next/router";
import BuyButton from "@/components/BuyButton/BuyButton";

const CartPage = ({fileContent, user}) => {

    // ROUTER
    const router = useRouter();

    // STATES
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        // CHECK IF THE POST IS ALREADY BOUGHT
        const boughtPosts = JSON.parse(localStorage.getItem("boughtPosts")) || [];

        setPosts(boughtPosts);

    }, [])

    const buyAll = () => {

        // CHECK IF THERE IS ANY POST IN THE CART
        if(posts.length === 0) {
            toast.error("You don't have any posts in the cart");
            return;
        }

        if(window.confirm("Are you sure you want to buy all the posts?")) {
            localStorage.removeItem("boughtPosts");
            setPosts([]);
            toast.success("Posts bought successfully");

            // REDIRECT TO THE HOME PAGE
            router.push("/")
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
                {/*<link*/}
                {/*    href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'*/}
                {/*    rel='stylesheet'*/}
                {/*/>*/}
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
            <div className={styles.cartPage}>
                <h1 className={styles.title}>Your Cart</h1>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>

                    {posts.length > 0 && posts.map((post, i) => {
                        return (
                            <tr key={i}>
                                <td>{post.title}</td>
                                <td>{post.price}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <button className={styles.buyButton} onClick={buyAll}>Buy</button>
            </div>
        </>
    );
};

export default CartPage;

export async function getServerSideProps() {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "post.css");
    const fileContent = await getCssData(cssFilePath);
    return {props: {fileContent}};
}
