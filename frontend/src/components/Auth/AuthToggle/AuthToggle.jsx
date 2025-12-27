import React from 'react';
import styles from './AuthToggle.module.css';

const AuthToggle = ({ isLogin, onToggle }) => {
  return (
    <div className={styles.toggleContainer}>
      <button
        onClick={() => onToggle(true)}
        className={`${styles.toggleButton} ${isLogin ? styles.active : ''}`}
      >
        Login
      </button>
      <button
        onClick={() => onToggle(false)}
        className={`${styles.toggleButton} ${!isLogin ? styles.active : ''}`}
      >
        Register
      </button>
    </div>
  );
};

export default AuthToggle;

