'use client'

import Link from "next/link";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import ProgressBar from './components/ProgressBar';

interface PeopleProgress {
  [key: string]: {
    progress: number,
    icon: string
  }
}

export default function Hoon() {
  const MAX_PROGRESS = 11;
  const [progress, setProgress] = useState<number>(1);

  const progressUp = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const prevProgress = progress;
    const nextProgress = progress + 1 < MAX_PROGRESS ? progress + 1 : progress;
    setProgress(nextProgress);
    console.log(nextProgress);

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        body: JSON.stringify({
          name: 'hoon',
          progress: nextProgress,
        })
      })

      if (res.status == 201) {
        console.log('게이지 서버 전송 성공');
      } else {
        console.log('게이지 서버 전송 실패');
        setProgress(prevProgress);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const reset = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const prevProgress = progress;
    setProgress(1);

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        body: JSON.stringify({
          name: 'hoon',
          progress: 1,
        })
      })

      if (res.status == 201) {
        console.log('게이지 서버 전송 성공');
      } else {
        console.log('게이지 서버 전송 실패');
        setProgress(prevProgress);
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  const people: PeopleProgress = {
    jhyun: {
      progress: 1,
      icon: '☃️',
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

  useEffect(() => {
    const initProgress = async () => {
      try {
        const res = await fetch('/api/progress');
        const json: PeopleProgress = await res.json();
        
        Object.keys(json).forEach((name, index) => {
          if (name === 'hoon') setProgress(json[name].progress);
          else {
            setPeopleProgress((prevState) => {
              return { 
                ...prevState, 
                [name]: { 
                  progress: json[name].progress,
                  icon: prevState[name].icon,
                }
              }
            })
          }
        })
      } catch (err) {
        console.log(err);
      }
    }

    initProgress();
  }, [])

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
          Object.keys(peopleProgress).map((name, index) => {
            return (
              <ProgressBar
                name={name}
                icon={peopleProgress[name].icon}
                count={peopleProgress[name].progress}
                key={index}
              />
            )
          })
        }
      </div>
    </>
  )
}