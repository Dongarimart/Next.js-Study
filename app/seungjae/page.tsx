'use client'
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";


export default function Seungjae() {
  const [crap, SetCrap] = useState(1);
  
  const AddCrap = () => {
    SetCrap(crap+1);
  }

  return (
    <div className={styles.btn}>
      <button onClick={AddCrap}>양념게장도 먹고싶다</button>
    <div className={styles.progressBar}>
      {'🦀 '.repeat(crap)}
    </div>
    <div className={styles.btn2}>
    <button onClick={() => SetCrap(1)}>Reset</button>
    <Link href="/">
        <button className={styles.btn2}>Home</button>
      </Link>
    </div>
  </div>
  )
}