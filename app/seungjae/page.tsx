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
  }
  
  const AddCrap = () => {
    if(crap < MAX_PROGRESS){
      SetCrap(crap+1)
    }
  }

  // TODO - useEffect, setPeopleProgress로 나와 다른사람의 게이지 API로 받아오기
  const [peopleProgress, setPeopleProgress] = useState(people);

  useEffect(() => {
    (async () => {
      const {data} = await (await fetch(`/api/progress`)).json();
      setPeopleProgress(data);
    })();
  }, []);

  // console.log(peopleProgress)

  return (
  <>
    {/* 내 게이지 */}
    <div className={styles.all}>
    <div className={styles.btn}>
      <button onClick={AddCrap}>양념게장도 먹고싶다</button>
      <div className={styles.progressBar}>
        {/* 승재야 나랑 이모티콘이 겹쳐서 이걸로 바꿨다.. 미안... ㅎㅎ */}
        {'🖐️'.repeat(crap)}
      </div>
      <div className={styles.btn2}>
        <button onClick={() => SetCrap(1)}>Reset</button>
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
          icon={people.hoon.icon} 
          count={people.hoon.progress}
        />
      }
              {
        // 반복되는 요소는 Component로 만들어 조립할 수 있다
        // ProgressBar Component 파일 위치: ./components/ProgressBar.tsx
        // ProgressBar 파일 편집해도 상관 없음.
        <ProgressBar
          name={'jhyun'}
          icon={people.jhyun.icon} 
          count={people.jhyun.progress}
        />
      }
              {
        // 반복되는 요소는 Component로 만들어 조립할 수 있다
        // ProgressBar Component 파일 위치: ./components/ProgressBar.tsx
        // ProgressBar 파일 편집해도 상관 없음.
        <ProgressBar
          name={'tae'}
          icon={people.tae.icon} 
          count={people.tae.progress}
        />
      }
    </div>
    </div>
  </>
  )
}