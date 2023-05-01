import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import getCssData from "@/helpers/readCssFile";

//NODE
const path = require("path");

export default function Login({ fileContent }) {
    return (
        <>
            <Head>
                <meta charset='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>Login</title>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                />
                {/* <link rel='stylesheet' type='text/css' href='/css/login.css' /> */}
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
                    crossorigin
                />
                <style
                    dangerouslySetInnerHTML={{ __html: fileContent }}
                ></style>
            </Head>

            <div className='container'>
                <Script
                    src='https://kit.fontawesome.com/44f50e4aac.js'
                    crossOrigin='anonymous'
                ></Script>
                <div className='box'>
                    <h1>Login</h1>
                    <form>
                        <label>Username</label>
                        <div>
                            <i className='fa-solid fa-user'></i>
                            <input type='text' placeholder='Enter Username' />
                        </div>
                        <label>Password</label>
                        <div>
                            <i className='fa-solid fa-lock'></i>
                            <input
                                type='password'
                                placeholder='Enter Password'
                            />
                        </div>
                        <a href='#' className='forgot'>
                            Forgot Password?
                        </a>
                        <Link href='/login' className='tut'>
                            Login
                        </Link>
                        <Link href='/registration' className='sign-up'>
                            Sign Up
                        </Link>
                    </form>

                    <div className='Home'>
                        <Link href='/' className='home'>
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
    const cssFilePath = path.join(process.cwd(), "styles", "css", "login.css");
    const fileContent = await getCssData(cssFilePath);
    return { props: { fileContent } };
}
