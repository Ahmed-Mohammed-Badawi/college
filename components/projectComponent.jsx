import Link from "next/link";
import styles from "./projectComponent.module.css";

export default function ProjectComponent({id, title, description, budget, duration}) {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h3 className={styles.heading}>
                    <Link href={`/jobs/application?id=${id}`}>
                        {title}
                    </Link>
                </h3>
                <p className={styles.text}>
                    {description}
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.price}>
                    <span className={styles.priceValue}>${budget}</span>
                </div>
                <div className={styles.days}>
                    <span className={styles.daysValue}>{duration}</span>
                    <span className={styles.daysLabel}>Days</span>
                </div>
            </div>
        </div>
    );
}
