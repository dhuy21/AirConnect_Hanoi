import React from 'react';
import styles from './PopButton.module.css';
import clsx from 'clsx';

const PopButton = ({ children = '', onClick, variant = 'pastelGreen' }) => {
  
  const classes = clsx(styles.popButton, variant && styles[variant]);
  

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default PopButton;

