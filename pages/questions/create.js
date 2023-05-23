import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import QuestionForm from "@/components/questionForm";
import getCssData from "@/helpers/readCssFile";

// NOTIFICATIONS
import {toast} from "react-toastify";
import {useEffect} from "react";

//NODE
const path = require("path");

export default function QuestionPage({ fileContent, user }) {

    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login")
                .then(() => {
                    toast.error("You must be logged in to access this page");
                })
        }
    }, [user, router])

    return (
        <>
            <Head>
                <title>Ask a Question</title>
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
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossorigin
                />

                <meta charset='UTF-8' />
                <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                <style
                    dangerouslySetInnerHTML={{ __html: fileContent }}
                ></style>
            </Head>
            <div className='fullpage' style={{minHeight: '100vh'}}>
                <div className='logo'>
                    <p>
                        <Link href='/'>Wasetak-Free</Link>
                    </p>
                </div>
                <div className='title'>
                    <h1>Tell us what is your problem?</h1>
                    <h3>
                        We will help you find the best solution for your problem and connect you with the best experts in the field
                        to help you solve your problem in the best way possible.
                    </h3>
                </div>
                <div className='form'>
                    <QuestionForm />
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    // Load the CSS file
    const cssFilePath = path.join(process.cwd(), "styles", "css", "hire.css");
    const fileContent = await getCssData(cssFilePath);
    return { props: { fileContent } };
}
