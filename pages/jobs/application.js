import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Proposal from "@/components/proposal";
import ProposalForm from "@/components/proposalForm";
import getCssData from "@/helpers/readCssFile";

//NODE
const path = require("path");

export default function Home({ fileContent }) {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
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
                <meta charSet='UTF-8' />
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
                    dangerouslySetInnerHTML={{ __html: fileContent }}
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
                    <h1>New Company logo</h1>
                </div>
                <div className='budget'>
                    <h1>Budget:</h1>
                    <h1>$45-$120 USD</h1>
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
                        <Link href='#'>New Company logo</Link>
                    </li>
                </ul>
            </div>
            <div className='main-contaner'>
                <h1>Job Description:</h1>
                <p className='description'>
                    Hello fellow freelancers,
                    <br />
                    <br />
                    I am in need of a graphic designer to create a simple
                    company logo for the company website, social platforms and
                    other business documents.
                    <br />
                    <br />
                    <br />
                    Company Name - Waveform Media
                    <br />
                    <br />
                    Logo idea - A simple audio waveform design in the shape of
                    the company initials WM is all it really needs to be.
                    However, if you can incorporate a curling ocean wave into
                    the audio waveform as well, that would add a nice personal
                    touch to the logo. I&#39;ve added 3 images to hopefully help
                    out in the right direction.
                    <br />
                    Best of luck to everyone and thank you for your time,
                    <br />
                    <br />
                    <br />
                    Jeff
                </p>
                <br />
                <br />
                <hr />
                <br />
                <br />
                <div className='About-the-Client'>
                    <h2> About the Client: </h2>
                    <div className='c-userr'>
                        <Image
                            src='/images/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg'
                            alt=''
                            className='usrr-imgg'
                            width={300}
                            height={300}
                        />
                        <p className='usr-name'>User_Name</p>
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
                    <div className='egy'>
                        <Image
                            src='/images/640px-Flag_of_Egypt.svg.png'
                            alt=''
                            width={100}
                            height={67}
                            className='usr-imgg'
                        />
                        <p> Cairo,Egypt</p>
                    </div>
                </div>
            </div>
            <div className='comments_section'>
                <h2 className='comments_section__h2'>Proposals</h2>
                <ProposalForm />
                <Proposal
                    freelancer='John Doe'
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, metus ac malesuada faucibus, metus nulla efficitur purus, at aliquam dolor diam quis nibh. Sed posuere fermentum consequat. Sed vel augue in urna suscipit tincidunt.'
                    imageUrl='https://via.placeholder.com/150'
                />
                <Proposal
                    freelancer='John Doe'
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, metus ac malesuada faucibus, metus nulla efficitur purus, at aliquam dolor diam quis nibh. Sed posuere fermentum consequat. Sed vel augue in urna suscipit tincidunt.'
                    imageUrl='https://via.placeholder.com/150'
                />
                <Proposal
                    freelancer='John Doe'
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, metus ac malesuada faucibus, metus nulla efficitur purus, at aliquam dolor diam quis nibh. Sed posuere fermentum consequat. Sed vel augue in urna suscipit tincidunt.'
                    imageUrl='https://via.placeholder.com/150'
                />
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "post.css");
    const fileContent = await getCssData(cssFilePath);
    return { props: { fileContent } };
}
