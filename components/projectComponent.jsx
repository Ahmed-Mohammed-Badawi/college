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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores et totam perspiciatis, veritatis voluptatem quis debitis ut reiciendis amet distinctio. Molestiae, harum? Tempore perspiciatis laborum libero eos molestias aut unde.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores et totam perspiciatis, veritatis voluptatem quis debitis ut reiciendis amet distinctio. Molestiae, harum? Tempore perspiciatis laborum libero eos molestias aut unde.
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
