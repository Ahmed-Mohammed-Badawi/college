import React from "react";
import styles from "./proposal.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Proposal = ({ freelancer, text, imageUrl, userId, days, cost, user, postId, proposalId, refreshTheProposals }) => {

    // ROUTER
    const router = useRouter();

    const theSameUser = user?.uid === userId;

    const handleDelete = () => {
        if(!confirm("Are you sure you want to delete this proposal?")) return;

        axios.delete(`/api/posts/deleteProposal?postId=${postId}&commentId=${proposalId}`)
            .then((_) => {
                toast.success("Proposal deleted successfully");
                refreshTheProposals();
            })
            .catch((err) => {
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
                    {theSameUser && <button onClick={handleDelete} className={styles.delete}>Delete</button>}
                </div>
            </div>
            <div className={styles.proposalText}>
                <h3>Proposal</h3>
                <p>
                    Price: <span>{cost}$</span> - Time: <span>{days}</span> days
                </p>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Proposal;
