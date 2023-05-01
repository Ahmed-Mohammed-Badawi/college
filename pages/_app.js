import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
    return (
        <>
            <NextNProgress color="#007fed" />
            <Component {...pageProps} />;
        </>
    );
}
