import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
// FIREBASE TEST
import axios from "axios";
import { useEffect } from "react";
// TOSTIFY
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {

    // useEffect(() => {
    //     axios.get('/api/user/create')
    //     .then(res => {console.log(res)})
    //     .catch(err => {console.log(err)})
    // }, [])
    // // console.log(db)

    return (
        <>
            <NextNProgress color="#007fed" />
            <Component {...pageProps} />;
            <ToastContainer position="bottom-right" />
        </>
    );
}
