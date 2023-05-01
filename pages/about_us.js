import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import getCssData from "@/helpers/readCssFile";

//NODE
const path = require("path");

export default function AboutUs({fileContent}) {
    return (
        <>
            <Head>
                <title>About Us</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                />
                {/* <link rel='stylesheet' type='text/css' href="/css/aboutus.css" /> */}

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
            <div className='pageContainer'>
                <header className='head'>
                    <Script
                        src='https://kit.fontawesome.com/44f50e4aac.js'
                        crossorigin='anonymous'
                    ></Script>
                    <nav className='head-nav'>
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
                                    <Link href='/aboutus'>About</Link>
                                </li>
                                <li>
                                    <Link href='/contact'>Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                </header>
                <section className='about-section'>
                    <div className='container'>
                        <div className='row'>
                            <div className='content-column col-lg-6 col-md-12 col-sm-12 order-2'>
                                <div className='inner-column'>
                                    <div className='sec-title'>
                                        <span className='title'>About Us</span>
                                        <h2>
                                            Welcome to Wasetak-Free <br />
                                            freelancers from all backgrounds and
                                            industries
                                        </h2>
                                    </div>
                                    <div className='text'>
                                        <p>
                                            Welcome to Wasetak-Free, a freelance
                                            marketplace that connects talented
                                            freelancers with businesses and
                                            individuals looking for quality
                                            work. Our platform is designed to
                                            empower freelancers and provide them
                                            with the tools they need to succeed
                                            in today&#39;s digital world.
                                        </p>
                                        <div>
                                            <h2 className='Vision'>Vision:</h2>
                                        </div>
                                        <p>
                                            To create a world where freelancers
                                            can work on their own terms, achieve
                                            financial independence, and
                                            contribute to the growth of the
                                            global economy.
                                        </p>
                                        <div>
                                            <h2 className='Vision'>Mission:</h2>
                                        </div>
                                        <p>
                                            Our mission is to empower
                                            freelancers by providing them with a
                                            platform to showcase their skills,
                                            connect with high-quality clients,
                                            and build successful careers. We
                                            strive to foster a community that
                                            values collaboration, innovation,
                                            and mutual respect, and to ensure
                                            that freelancers are paid fairly and
                                            on time. Our goal is to be the go-to
                                            platform for freelancers around the
                                            world, providing them with the tools
                                            and resources they need to thrive in
                                            today&#39;s digital economy.
                                        </p>
                                    </div>
                                    <ul className='list-style-one'>
                                        <li>
                                            we believe that everyone has a
                                            unique set of skills
                                        </li>
                                        <li>
                                            Our goal is to help freelancers
                                            showcase their skills and connect
                                            with clients
                                        </li>
                                        <li>
                                            helping you achieve your goals and
                                            build a successful freelance career.
                                        </li>
                                    </ul>
                                    <div className='btn-box'>
                                        <Link
                                            href='/contact'
                                            className='theme-btn btn-style-one'
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Image Column */}
                            <div className='image-column col-lg-6 col-md-12 col-sm-12'>
                                <div className='inner-column wow fadeInLeft'>
                                    <figure className='image-1'>
                                        <a
                                            href='#'
                                            className='lightbox-image'
                                            data-fancybox='images'
                                        >
                                            <Image
                                                src='/images/pexels-caio-56759.jpg'
                                                alt=''
                                                width={400}
                                                height={600}
                                            />
                                        </a>
                                    </figure>
                                    <figure className='image-2'>
                                        <a
                                            href='#'
                                            className='lightbox-image'
                                            data-fancybox='images'
                                        >
                                            <Image
                                                src='/images/pexels-canva-studio-3194518.jpg'
                                                alt=''
                                                width={400}
                                                height={600}
                                            />
                                        </a>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    // Load the CSS file
    const cssFilePath = path.join(
        process.cwd(),
        "styles",
        "css",
        "aboutus.css"
    );
    const fileContent = await getCssData(cssFilePath);
    return { props: { fileContent } };
}
