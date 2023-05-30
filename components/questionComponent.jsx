// FRAMEWORK
import Link from "next/link";
// STYLES
import styles from "./questionComponent.module.css";

export default function ProjectComponent({id, title, description}) {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h3 className={styles.heading}>
                    <Link href={`/questions/application?id=${id}`}>
                        {title}
                    </Link>
                </h3>
                <p className={styles.text}>
                    {description}
                </p>
            </div>
        </div>
    );
}
