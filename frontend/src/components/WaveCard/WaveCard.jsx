import React from 'react';
import styles from './WaveCard.module.css';
import clsx from 'clsx';

const WaveCard = ({ icon: Icon, title, description }) => {
    const classes = clsx(styles.card, styles.playing);

  return (
      <div className={classes}>
        <div className={styles.image} />
        <div className={styles.wave} />
        <div className={styles.wave} />
        <div className={styles.wave} />
        <div className={styles.infotop}>
            <div className={`w-10 h-10 rounded-lg bg-white text-green-500 flex items-center justify-center`}>
                <Icon className={styles.icon} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
      </div>
  );
}

export default WaveCard;
