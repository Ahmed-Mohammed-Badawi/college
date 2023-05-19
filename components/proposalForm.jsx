import {useState} from "react";
import styles from "./ProposalForm.module.css";
import {toast} from "react-toastify";
import axios from "axios";

function ProposalForm({postId, refreshTheProposals}) {

    // STATES
    const [loading, setLoading] = useState(false);
    const [cost, setCost] = useState('');
    const [days, setDays] = useState('');
    const [offer, setOffer] = useState("");

    // HANDLERS
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cost || !days || !offer) {
            toast.error("Please fill all the fields");
            return;
        }

        //Set loading to true
        setLoading(true);

        //Send data to backend
        const data = {
            cost,
            days,
            offer
        };

        axios.post(`/api/posts/addComment?postId=${postId}`, data)
            .then((res) => {
                toast.success("Proposal sent successfully");
                setLoading(false);
                setCost('');
                setDays('');
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
            <div className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                    <label htmlFor='input1'>Cost:</label>
                    <input
                        type='number'
                        id='input1'
                        name='input1'
                        className={styles.input}
                        placeholder="ex: 15"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='input2'>Days:</label>
                    <input
                        type='number'
                        id='input2'
                        name='input2'
                        className={styles.input}
                        placeholder="ex: 3"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor='textarea'>Offer:</label>
                <textarea
                    id='textarea'
                    name='message'
                    rows='4'
                    className={styles.textarea}
                    placeholder="Type your offer here...."
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                ></textarea>
            </div>
            <button type='submit' className={styles.submitButton}>
                Submit
            </button>
        </form>
    );
}

export default ProposalForm;
