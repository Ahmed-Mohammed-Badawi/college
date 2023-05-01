import Link from "next/link";
import styles from "./projectComponent.module.css";

export default function ProjectComponent() {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h3 className={styles.heading}>
                    <Link href={'/jobs/application'}>
                        Feel free to customize the styles to your liking!
                    </Link>
                </h3>
                <p className={styles.text}>
                    give me a nextjs component styled with css module which
                    contains: 1. parent container which has 2 parts left and
                    right the left width is 80% and contains h3 and p 2. the
                    right part has a price part and days part note: make it very
                    nice styled
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.price}>
                    <span className={styles.priceValue}>$100</span>
                </div>
                <div className={styles.days}>
                    <span className={styles.daysValue}>7</span>
                    <span className={styles.daysLabel}>Days</span>
                </div>
            </div>
        </div>
    );
}
