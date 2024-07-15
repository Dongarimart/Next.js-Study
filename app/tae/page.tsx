import styles from "./page.module.css";

export default function Tae() {
  return (
    <div className={styles.container}>
      <h1>배가너무부름</h1>
      <div className={styles.progressBar}>
        🍕
      </div>
    </div>
  )
}