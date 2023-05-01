import styles from "./ProposalForm.module.css";

function ProposalForm() {
    return (
        <form className={styles.form}>
            <div className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                    <label htmlFor='input1'>Cost:</label>
                    <input
                        type='number'
                        id='input1'
                        name='input1'
                        className={styles.input}
                        placeholder="ex: 15"
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
                ></textarea>
            </div>
            <button type='submit' className={styles.submitButton}>
                Submit
            </button>
        </form>
    );
}

export default ProposalForm;
