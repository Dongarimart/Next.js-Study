import React from 'react';
import styles from '../page.module.css';

interface Props {
  name: string;
  icon: string;
  count: number;
}

export default function ProgressBar({ name, icon='😀', count=1 }: Props): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        width: '80%',
        gap: '16px',
        fontSize: 'large',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h2 className={styles.progressBar_header}>{name}</h2>
      <div className={styles.progressBar}>
        {icon.repeat(count)}
      </div>
    </div>
  )
}