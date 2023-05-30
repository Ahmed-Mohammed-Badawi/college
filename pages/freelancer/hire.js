// FRAMEWORK
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect} from "react";
import Link from "next/link";
// COMPONENTS
import ProjectForm from "@/components/projectForm";
// HELPERS
import getCssData from "@/helpers/readCssFile";

// NOTIFICATIONS
import {toast} from "react-toastify";

//NODE HELPER TO GET THE PATH OF THE CSS FILE
const path = require("path");

export default function HireForm({fileContent, user}) {

    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) {
                router.push("/login")
                    .then(() => {
                        toast.error("You must be logged in to access this page");
                    })
            }
        }, 2000)

        return () => clearTimeout(timer);
    }, [user, router])

    return (
        <>
            <Head>
                <title>Find a Freelancer</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                />
                {/* <link rel='stylesheet' type='text/css' href='/css/hire.css' /> */}
                <link
                    href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
                    rel='stylesheet'
                />
                <link
                    rel='stylesheet'
                    href='https://unpkg.com/boxicons@latest/css/boxicons.min.css'
                />
                <link rel='preconnect' href='https://fonts.googleapis.com'/>
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin
                />

                <meta charSet='UTF-8'/>
                <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
                <style
                    dangerouslySetInnerHTML={{__html: fileContent}}
                ></style>
            </Head>
            <div className='fullpage'>
                <div className='logo'>
                    <p>
                        <Link href='/'>Wasetak-Free</Link>
                    </p>
                </div>
                <div className='title'>
                    <h1>Tell us what you need done</h1>
                    <h3>
                        Contact skilled freelancers within minutes. View
                        profiles, ratings, portfolios and chat with them. Pay
                        the freelancer only when you are 100% satisfied with
                        their work
                    </h3>
                </div>
                <div className='form'>
                    <ProjectForm/>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "hire.css");
    const fileContent = await getCssData(cssFilePath);
    return {props: {fileContent}};
}
