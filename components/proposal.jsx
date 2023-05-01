import React from 'react';
import styles from './proposal.module.css';

const Proposal = ({ freelancer, text, imageUrl }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={freelancer} />
      </div>
      <div className={styles.header}>
        <h2>{freelancer}</h2>
        <div className={styles.buttons}>
          <button className={styles.delete}>Delete</button>
        </div>
      </div>
      <div className={styles.proposalText}>
        <h3>Proposal</h3>
        <p>Price: <span>250$</span> - Time: <span>7</span> days</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Proposal;