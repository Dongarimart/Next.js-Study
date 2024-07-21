'use client'; 
import { useState } from 'react';
import styles from './page.module.css';

const JhyunPage = () => {
  const [progress, setProgress] = useState(1);

  const handleButtonClick = () => {
    setProgress(progress + 1);
    // console.log('Progress:', progress + 1); 
  };

  const handleResetClick = () => {
    setProgress(0);
    console.log('Progress reset to 0'); 
  };

  return (
    <div className={styles.container}>
      <button onClick={handleButtonClick} className={styles.mainButton}>
        아 언제 시원해지냐
      </button>
      <div className={styles.progressBar}>
        {'❄'.repeat(progress)}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleResetClick} className={styles.resetButton}>
          Reset
        </button>
        <button onClick={() => window.location.href = '/'} className={styles.homeButton}>
          Home
        </button>
      </div>
    </div>
  );
};

export default JhyunPage;
