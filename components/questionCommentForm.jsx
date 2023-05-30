import {useState} from "react";
import styles from "./ProposalForm.module.css";
import {toast} from "react-toastify";
import axios from "axios";
import Spinner from "@/components/spinner/Spinner";

function ProposalForm({questionId, refreshTheProposals}) {

    // STATES
    const [loading, setLoading] = useState(false);
    const [comment, setOffer] = useState("");

    // HANDLERS
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment) {
            toast.error("Please fill all the fields");
            return;
        }

        //Set loading to true
        setLoading(true);

        //Send data to backend
        const data = {
            comment
        };

        axios.post(`/api/questions/addComment?questionId=${questionId}`, data)
            .then((res) => {
                toast.success("Proposal sent successfully");
                setLoading(false);
                setOffer('');
                refreshTheProposals();
            })
            .catch((err) => {
                toast.error(err.response?.data?.error || "Something went wrong");
                setLoading(false);
            });
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor='textarea'>Comment:</label>
                <textarea
                    id='textarea'
                    name='message'
                    rows='4'
                    className={styles.textarea}
                    placeholder="Type your comment here...."
                    value={comment}
                    onChange={(e) => setOffer(e.target.value)}
                ></textarea>
            </div>
            <button type='submit' className={styles.submitButton}>
                {loading ? (<Spinner size={0.5} color={"#ff5500"} />) : 'Submit'}
            </button>
        </form>
    );
}

export default ProposalForm;
