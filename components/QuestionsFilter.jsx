import { useState } from "react";
import styles from "./QuestionsFilter.module.css";

const ProjectFilter = ({ onFilter }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({
            title: title,
        });
    };

    return (
        <form className={styles.filter} onSubmit={handleSubmit}>
            <div className={styles.searchGroup}>
                <label htmlFor='search' className={styles.label}>
                    Search by title:
                </label>
                <input
                    type='text'
                    id='search'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    placeholder="Search"
                />
                <button type='submit' className={styles.button}>
                    Search
                </button>
            </div>
        </form>
    );
};

export default ProjectFilter;
