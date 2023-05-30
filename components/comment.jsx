import React from "react";
import styles from "./comment.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import Spinner from "@/components/spinner/Spinner";

const Proposal = ({freelancer, text, imageUrl, userId, user, postId, proposalId, refreshTheProposals}) => {

    // ROUTER
    const router = useRouter();

    const theSameUser = user?.uid === userId;

    // STATES FOR LOADING
    const [loading, setLoading] = React.useState(false);

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this proposal?")) return;
        setLoading(true);

        axios.delete(`/api/questions/deleteComment?questionId=${postId}&commentId=${proposalId}`)
            .then((_) => {
                setLoading(false);
                toast.success("Comment deleted successfully");
                refreshTheProposals();
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response?.data?.error || "Something went wrong");
            });
    }


    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Link href={`/profile?id=${userId}`} passHref><Image src={imageUrl} alt={freelancer} width={80}
                                                                     height={80}/></Link>
            </div>
            <div className={styles.header}>
                <Link href={`/profile?id=${userId}`} passHref><h2>{freelancer}</h2></Link>
                <div className={styles.buttons}>
                    {theSameUser && <button onClick={handleDelete} className={styles.delete}>Delete {loading &&
                        <Spinner size={0.5} color={"#ffffff"}/>}</button>}
                </div>
            </div>
            <div className={styles.proposalText}>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Proposal;
