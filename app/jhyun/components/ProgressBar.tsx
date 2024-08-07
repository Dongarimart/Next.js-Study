import React from 'react';
import styles from '../page.module.css';

interface Props {
  name: string;
  icon: string;
  count: number;
}

export default function ProgressBar({ name = '사람', icon = '😀', count = 1 }: Props): JSX.Element {
  return (
    <div className={styles.progressBarWrapper}>
      <h2 className={styles.progressBarName}>{name}</h2>
      <div className={styles.progressBar}>
        {icon.repeat(count)}
      </div>
    </div>
  )
}
