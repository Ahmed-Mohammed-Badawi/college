import {useState} from "react";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

import axios from "axios";
import {useEffect} from "react";
// NOTIFICATIONS
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({Component, pageProps}) {

    // STATE TO CHECK IF USER IS LOGGED IN
    const [user, setUser] = useState(null);

    // EFFECT TO CHECK IF USER IS LOGGED IN
    useEffect(() => {
        axios.get("/api/auth").then((res) => {
            // SET THE USER
            setUser(res.data.user);
        })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (
        <>
            <NextNProgress color="#007fed"/>
            <Component {...pageProps} user={user} />;
            <ToastContainer position="bottom-right"/>
        </>
    );
}
