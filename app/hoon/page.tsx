'use client'

import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import ProgressBar from './components/ProgressBar';

export default function Hoon() {
  const MAX_PROGRESS = 11;
  const [progress, setProgress] = useState<number>(1);

  const progressUp = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const nextProgress = progress + 1 < MAX_PROGRESS ? progress + 1 : progress;
    setProgress(nextProgress);
    console.log(nextProgress);
  }

  const reset = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setProgress(1);
  }
  
  const people = {
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

  // TODO - setPeopleProgress로 다른 사람들의 게이지 API로 받아오기
  const [peopleProgress, setPeopleProgress] = useState(people);

  return (
    <>
      {/* 내 게이지 */}
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
  )
}