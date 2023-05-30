// FRAMEWORK
import React from "react";
import Image from "next/image";
import Link from "next/link";
// STYLES
import styles from "./proposal.module.css";
// HELPERS
import axios from "axios";
// NOTIFICATIONS
import { toast } from "react-toastify";
// COMPONENTS
import Spinner from "@/components/spinner/Spinner";

const Proposal = ({ freelancer, text, imageUrl, userId, days, cost, user, postId, proposalId, refreshTheProposals }) => {

    const theSameUser = user?.uid === userId;

    // STATES FOR LOADING
    const [loading, setLoading] = React.useState(false);

    const handleDelete = () => {
        if(!confirm("Are you sure you want to delete this proposal?")) return;
        setLoading(true);
        axios.delete(`/api/posts/deleteProposal?postId=${postId}&commentId=${proposalId}`)
            .then((_) => {
                setLoading(false);
                toast.success("Proposal deleted successfully");
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
                <Link href={`/profile?id=${userId}`} passHref><Image src={imageUrl} alt={freelancer} width={80} height={80} /></Link>
            </div>
            <div className={styles.header}>
                <Link href={`/profile?id=${userId}`} passHref><h2>{freelancer}</h2></Link>
                <div className={styles.buttons}>
                    {theSameUser && <button onClick={handleDelete} className={styles.delete}>Delete {loading && <Spinner size={0.5} color={"#ffffff"} /> }</button>}
                </div>
            </div>
            <div className={styles.proposalText}>
                <h3>Proposal</h3>
                <p>
                    Price: <span>{cost}$</span> - Time: <span>{days}</span> days
                </p>
                <p className={'proposal-text'}>{text}</p>
            </div>
        </div>
    );
};

export default Proposal;
