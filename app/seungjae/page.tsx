'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import ProgressBar from './components/ProgressBar';

interface PeopleProgress {
  [key: string]: {
    progress: number,
    icon: string
  }
}

// 내꺼 서버저장하고 서버에서 받아오기 미구현되어있음

export default function Seungjae() {
  const MAX_PROGRESS = 11;
  const [crap, SetCrap] = useState<number>(1);

  const people: PeopleProgress = {
    hoon: {
      progress: 1,
      icon: '🦀',
    },
    jhyun: {
      progress: 1,
      icon: '⛄',
    },
    tae: {
      progress: 1,
      icon: '🍕',
    },
    seungjae: {
      progress: 1,
      icon: '🖐️',
    }
  }
  
  const AddCrap = async () => {
    if(peopleProgress.seungjae.progress < MAX_PROGRESS){
      const newCrap = peopleProgress.seungjae.progress+ 1;
      SetCrap(newCrap);

      // 서버에 새로운 값 저장
      await updateProgress({ name: 'seungjae', progress: newCrap });

    }
  }

  const resetCrap = async () => {
    const newCrap = 1;
    SetCrap(newCrap);

    // 서버에 새로운 값 저장
    await updateProgress({ name: 'seungjae', progress: newCrap });
  }

  // TODO - useEffect, setPeopleProgress로 나와 다른사람의 게이지 API로 받아오기
  const [peopleProgress, setPeopleProgress] = useState(people);

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:3000/api/progress")
      .then((res) => res.json())
      .then((data) => setPeopleProgress(data));
    })();
  }, []);

  const updateProgress = async (progressData: { name: string, progress: number }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progressData),
    };

    try {
      const res = await fetch("http://localhost:3000/api/progress", options);
      const data = await res.json();

      // 서버에서 받아온 데이터로 상태 업뎃
      setPeopleProgress(prevState => ({
        ...prevState,
        [progressData.name]: {
          ...prevState[progressData.name],
          progress: progressData.progress
        }
      }));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

   console.log(peopleProgress)

  return (
  <>
    {/* 내 게이지 */}
    <div className={styles.all}>
    <div className={styles.btn}>
      <button onClick={AddCrap}>양념게장도 먹고싶다</button>
      <ProgressBar
          name="seungjae"
          icon={peopleProgress.seungjae.icon} 
          count={peopleProgress.seungjae.progress}
        />
      <div className={styles.btn2}>
        <button onClick={resetCrap}>Reset</button>
        <Link href="/">
          <button className={styles.btn2}>Home</button>
        </Link>
      </div>
    </div>

    {/* 다른 사람들 게이지 */}
    {/* TODO - 다른 3명의 게이지 UI/UX 완성하기 */}
    <div className={styles.btn}>
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
              {
        // 반복되는 요소는 Component로 만들어 조립할 수 있다
        // ProgressBar Component 파일 위치: ./components/ProgressBar.tsx
        // ProgressBar 파일 편집해도 상관 없음.
        <ProgressBar
          name={'jhyun'}
          icon={peopleProgress.jhyun.icon} 
          count={peopleProgress.jhyun.progress}
        />
      }
              {
        // 반복되는 요소는 Component로 만들어 조립할 수 있다
        // ProgressBar Component 파일 위치: ./components/ProgressBar.tsx
        // ProgressBar 파일 편집해도 상관 없음.
        <ProgressBar
          name={'tae'}
          icon={peopleProgress.tae.icon} 
          count={peopleProgress.tae.progress}
        />
      }
    </div>
    </div>
  </>
  )
}