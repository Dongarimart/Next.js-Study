import styles from "./page.module.css";

export default function JHyun() {
  return (
    <div className={styles.container}>
      <h1>벌써 주말이 끝이라니</h1>
      <p>시간이 너무 빨라요</p>
      <div className={styles.progressBar}>
        ⌚
      </div>
    </div>
  );
};