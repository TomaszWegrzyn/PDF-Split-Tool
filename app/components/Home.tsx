import React from 'react';
import styles from './Home.css';
import FileComponent from '../features/file/file';

export default function Home(): JSX.Element {
  const fileComponent = FileComponent();
  return (
    <div className={styles.container} data-tid="container">
      {fileComponent}
    </div>
  );
}
