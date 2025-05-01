import styles from "./BackgroundAnimation.module.css";

export default function BackgroundAnimation() {
  return (
    <div className={styles["bg-animation"]}>
      <div className={styles["stars-first-layer"]} />
      <div className={styles["stars-second-layer"]} />
    </div>
  );
}
