'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from 'next/link';
import ProgressBar from './components/ProgressBar';

interface PeopleProgress {
  [key: string]: {
    progress: number,
    icon: string
  }
}

export default function Tae() {
  const [pizzaCount, setPizzaCount] = useState<number>(1);
  const MAX_PIZZA = 11;

  const people: PeopleProgress = {
    hoon: {
      progress: 1,
      icon: '🦀',
    },
    seungjae: {
      progress: 1,
      icon: '🖐️',
    },
    jhyun: {
      progress: 1,
      icon: '⛄',
    },
  }

  // TODO - useEffect, setPeopleProgress로 나와 다른사람의 게이지 API로 받아오기
  const [peopleProgress, setPeopleProgress] = useState(people);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('/api/getProgress');
        setPeopleProgress(response.data);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchProgress();
  }, []);

  const handleButtonClick = () => {
    if (pizzaCount < MAX_PIZZA){
      setPizzaCount(pizzaCount+1);
    }
  };

  return (
  <>
    <div className={styles.container}>
      <button className={styles.button} onClick={handleButtonClick}>
        배가너무부름
        </button>
      <div className={styles.progressBar}>
        {"🍕".repeat(pizzaCount)}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => setPizzaCount(1)}>Reset</button>
        <Link href="/">
          <button>Home</button>
        </Link>
      </div>
    </div>
    
    {/* 다른 사람들 게이지 */}
    {/* TODO - 다른 3명의 게이지 UI/UX 완성하기 */}
    <div className={styles.container}>
        {Object.keys(peopleProgress).map((key) => (
          <ProgressBar
          key={key}
          name={key}
          icon={peopleProgress[key].icon} 
          count={peopleProgress[key].progress}
        />
        ))
          // 반복되는 요소는 Component로 만들어 조립할 수 있다
          // ProgressBar Component 파일 위치: ./components/ProgressBar.tsx
          // ProgressBar 파일 편집해도 상관 없음.
        }
      </div>
  </>
  );
}