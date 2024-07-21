'use client';

import { useState } from "react";

import styles from "./page.module.css";

export default function Tae() {

  const [pizzaCount, setPizzaCount] = useState(1);

  const handleButtonClick = () => {
    setPizzaCount(pizzaCount+1);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleButtonClick}>
        배가너무부름
        </button>
      <div className={styles.progressBar}>
        {"🍕".repeat(pizzaCount)}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => setPizzaCount(1)}>Reset</button>
        <a href="/">
          <button>Home</button>
        </a>
      </div>
    </div>
  );
}