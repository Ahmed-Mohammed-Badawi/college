import styles from "./Form.module.css";

const Form = () => {

    function submitHandler(event){
        event.preventDefault();
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.formGroup}>
                <label htmlFor='projectTitle'>Project Title</label>
                <input type='text' id='projectTitle' name='projectTitle' placeholder="Title" />
            </div>
            <div className={[styles.formGroup]}>
                <label>
                    Are you a service provider or a service requester?
                </label>
                <div className={styles.Inputs_container}>
                    <div className={styles.radioButton}>
                        <input
                            type='radio'
                            id='serviceProvider'
                            name='serviceType'
                            value='provider'
                        />
                        <label htmlFor='serviceProvider'>
                            Service Provider
                        </label>
                    </div>
                    <div className={styles.radioButton}>
                        <input
                            type='radio'
                            id='serviceRequester'
                            name='serviceType'
                            value='requester'
                        />
                        <label htmlFor='serviceRequester'>
                            Service Requester
                        </label>
                    </div>
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor='expectedDays'>Expected number of days</label>
                <input type='number' id='expectedDays' name='expectedDays' placeholder="ex: 4" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor='expectedCost'>Expected number of cost</label>
                <input type='number' id='expectedCost' name='expectedCost' placeholder="ex: 250"/>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor='projectDescription'>Project Description</label>
                <textarea id='projectDescription' name='projectDescription' placeholder="Type your description..."/>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.fileUploaderLabel} htmlFor='fileUploader'>File Uploader</label>
                <input type='file' id='fileUploader' name='fileUploader' />
            </div>
            <button type="submit">
                Create
            </button>
        </form>
    );
};

export default Form;
