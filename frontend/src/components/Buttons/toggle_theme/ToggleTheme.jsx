import React from 'react';
import styles from './ToggleTheme.module.css';
import { useTheme } from '../../../contexts/ThemeContext';
import clsx from 'clsx';

const ToggleTheme = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleChange = () => {
    toggleTheme();
  };

  return (
    <div className={clsx(styles.toggleTheme, className)}>
      <label className={styles.switch}>
        <input 
          type="checkbox" 
          id="toggle" 
          checked={isDarkMode}
          onChange={handleChange}
        />
        <span className={styles.slider}>
          <div className={styles.moonsHole}>
            <div className={styles.moonHole} />
            <div className={styles.moonHole} />
            <div className={styles.moonHole} />
          </div>
          <div className={styles.blackClouds}>
            <div className={styles.blackCloud} />
            <div className={styles.blackCloud} />
            <div className={styles.blackCloud} />
          </div>
          <div className={styles.clouds}>
            <div className={styles.cloud} />
            <div className={styles.cloud} />
            <div className={styles.cloud} />
            <div className={styles.cloud} />
            <div className={styles.cloud} />
            <div className={styles.cloud} />
            <div className={styles.cloud} />
          </div>
          <div className={styles.stars}>
            <svg className={styles.star} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={styles.star} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={styles.star} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={styles.star} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={styles.star} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
          </div>
        </span>
      </label>
    </div>
  );
};

export default ToggleTheme;
