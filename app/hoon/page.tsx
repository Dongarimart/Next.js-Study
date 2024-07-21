'use client'

import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";

export default function Complete() {
  const [progress, setProgress] = useState<number>(1);

  const progressUp = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const nextProgress = progress + 1 < 16 ? progress + 1 : progress;
    setProgress(nextProgress);
    console.log(nextProgress);
  }

  const reset = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setProgress(1);
  }

  return (
    <div className={styles.container}>
      <button 
        className={styles.clickMe}
        onClick={progressUp}
      >
        아 간장게장 먹고싶다
      </button>
      <div className={styles.progressBar}>
        {'🦀'.repeat(progress)}
      </div>
      <div className={styles.buttonBar}>
        <button 
          className={styles.reset}
          onClick={reset}
        >
          Reset
        </button>
        <Link
          className={styles.reset}
          href='/'
        >
          Home
        </Link>
      </div>
    </div>
  )
}