import { useState } from "react";
import styles from "./ProjectFilter.module.css";

const ProjectFilter = ({ onFilter }) => {
    const [title, setTitle] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [daysMin, setDaysMin] = useState("");
    const [daysMax, setDaysMax] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({
            title: title.trim(),
            priceMin: parseFloat(priceMin),
            priceMax: parseFloat(priceMax),
            daysMin: parseInt(daysMin),
            daysMax: parseInt(daysMax),
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
            <div className={styles.priceGroup}>
                <label htmlFor='price' className={styles.label}>
                    Filter by price:
                </label>
                <input
                    type='number'
                    id='priceMin'
                    placeholder='Min'
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className={`${styles.input} ${styles.rangeInput}`}
                />
                <input
                    type='number'
                    id='priceMax'
                    placeholder='Max'
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className={`${styles.input} ${styles.rangeInput}`}
                />
            </div>
            <div className={styles.daysGroup}>
                <label htmlFor='days' className={styles.label}>
                    Filter by days:
                </label>
                <input
                    type='number'
                    id='daysMin'
                    placeholder='Min'
                    value={daysMin}
                    onChange={(e) => setDaysMin(e.target.value)}
                    className={`${styles.input} ${styles.rangeInput}`}
                />
                <input
                    type='number'
                    id='daysMax'
                    placeholder='Max'
                    value={daysMax}
                    onChange={(e) => setDaysMax(e.target.value)}
                    className={`${styles.input} ${styles.rangeInput}`}
                />
            </div>
            <button type='submit' className={styles.button}>
                Filter
            </button>
        </form>
    );
};

export default ProjectFilter;
