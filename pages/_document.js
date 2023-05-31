import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet='utf-8' />
                    <link
                        rel='stylesheet'
                        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                    />
                    <Script
                        src='https://kit.fontawesome.com/44f50e4aac.js'
                        crossOrigin='true'
                    ></Script>
                    <Script
                        src='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js'
                        integrity='sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct'
                        crossorigin='true'
                    ></Script>
                    <link
                        href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
                        rel='stylesheet'
                    />
                    <link
                        rel='stylesheet'
                        href='https://unpkg.com/boxicons@latest/css/boxicons.min.css'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin='true'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap'
                        rel='stylesheet'
                    />
                    <script src='/JS/script.js' defer></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
