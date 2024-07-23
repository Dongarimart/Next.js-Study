'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import ProgressBar from './components/ProgressBar';

interface PeopleProgress {
  [key: string]: {
    progress: number,
    icon: string
  }
}

export default function JhyunPage() {
  const MAX_PROGRESS = 11;
  const [progress, setProgress] = useState<number>(1);

  const people: PeopleProgress = {
    hoon: {
      progress: 1,
      icon: '🦀',
    },
    seungjae: {
      progress: 1,
      icon: '🖐️',
    },
    tae: {
      progress: 1,
      icon: '🍕',
    },
  }

  // TODO - useEffect, setPeopleProgress로 나와 다른사람의 게이지 API로 받아오기
  const [peopleProgress, setPeopleProgress] = useState(people);

  const handleButtonClick = () => {
    setProgress(prevProgress => Math.min(prevProgress +1, MAX_PROGRESS))
    console.log('Progress:', progress + 1); 
  };

  const handleResetClick = () => {
    setProgress(1);
    console.log('Progress reset to 1'); 
  };

  return (
    <>
      {/* 내 게이지 */}
      <div className={styles.container}> 
        <button onClick={handleButtonClick} className={styles.mainButton}>
          아 언제 시원해지냐
        </button>
        <div className={styles.progressBar}>
          {'⛄'.repeat(progress)}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleResetClick} className={styles.resetButton}>
            Reset
          </button>
          <Link href='/' className={styles.homeButton}>
            Home
          </Link>
        </div>
      </div>

      {/* 다른 사람들 게이지 */}
      {/* TODO - 다른 3명의 게이지 UI/UX 완성하기 */}
      <div className={styles.container}>
        {
          // 반복되는 요소는 Component로 만들어 조립할 수 있다
          // ProgressBar Component 파일 위치: ./components/ProgressBar.tsx
          // ProgressBar 파일 편집해도 상관 없음.
          <ProgressBar
            name={'hoon'}
            icon={peopleProgress.hoon.icon} 
            count={peopleProgress.hoon.progress}
          />
        }
      </div>
    </>
  );
};


