'use client';

import { useState, useEffect } from 'react';
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

  const [peopleProgress, setPeopleProgress] = useState<PeopleProgress>(people);

  useEffect(() => {
    const fetchPeopleProgress = async () => {
      try {
        const response = await fetch('/api/progress');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: PeopleProgress = await response.json();
        setPeopleProgress(data);
      } catch (error) {
        console.error('Failed to fetch progress data:', error);
      }
    };
    fetchPeopleProgress();
  }, []);

  const handleButtonClick = async () => {
    setProgress(prevProgress => Math.min(prevProgress + 1, MAX_PROGRESS));
    console.log('Progress:', progress + 1);

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "jhyun",
          progress: progress + 1,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      console.log('Progress updated:', json);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleResetClick = async () => {
    setProgress(1);
    console.log('Progress reset to 1');

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "jhyun",
          progress: 1,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      console.log('Progress reset:', json);
    } catch (error) {
      console.error('Failed to reset progress:', error);
    }
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
        <ProgressBar
          name={'hoon'}
          icon={peopleProgress.hoon.icon} 
          count={peopleProgress.hoon.progress}
        />
        <ProgressBar
          name={'seungjae'}
          icon={peopleProgress.seungjae.icon} 
          count={peopleProgress.seungjae.progress}
        />
        <ProgressBar
          name={'tae'}
          icon={peopleProgress.tae.icon} 
          count={peopleProgress.tae.progress}
        />
      </div>
    </>
  );
}
