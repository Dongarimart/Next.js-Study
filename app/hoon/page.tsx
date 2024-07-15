import styles from "./page.module.css";

export default function Hoon() {
  return (
    <div className={styles.container}>
      <h1>아 간장게장 먹고싶다</h1>
      <div className={styles.progressBar}>
        🦀
      </div>
    </div>
  )
}