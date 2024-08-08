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
    localStorage.setItem('pizzaCount', pizzaCount.toString());
  }, [pizzaCount]); // 페이지를 나갔다 돌아와도 게이지가 저장되도록 한다. 


  useEffect(() => {
    const fetchProgress = async () => { // async를 통해 비동기함수로써 정의
      const api = await fetch('/api/progress');
      const json = await api.json();
      setPeopleProgress(json);
      console.log(json); // 콘솔에 띄우기.
    };

    fetchProgress(); // 비동기함수이므로 호출해주어야 데이터를 사용할 수 있다.
  }, []);

  const handleButtonClick = () => {
    if (pizzaCount < MAX_PIZZA){
      const newPizzaCount = pizzaCount + 1;
      setPizzaCount(newPizzaCount);
    

    const fetcher = async () => {
    const api = await fetch('/api/progress',{
      method: 'POST', // 데이터를 보낼 때는 방법을 명시해주기 
      body: JSON.stringify({ // body에는 원래 string값이 들어감, stringify로 json을 바꿔준다. 
        name: 'tae',
        progress: newPizzaCount,
      }),
    }
    );
    const data = await api.json();
    console.log(data);
  
  };
  fetcher();
}
  };

  

// 두번재는 감시할 함수
// 작동시킬 함수를 불러오는 게 callback함수 
// 이벤트가 발생했을 때 실행시킬 함수 또한 콜백함수

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
        {Object.keys(peopleProgress)
        .filter((key) => key !== 'tae') // 아래 게이지에서 나를 빼기
        .map((key) => (
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