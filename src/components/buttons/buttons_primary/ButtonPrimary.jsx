import React from 'react';
import './ButtonPrimary.scss';

const ButtonPrimary = ({ children = 'Learn More', onClick, className = '', color = 'green' }) => {

  return (
    <div className={`button-primary ${className} ${color}`}>
      <button className="learn-more" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default ButtonPrimary;

