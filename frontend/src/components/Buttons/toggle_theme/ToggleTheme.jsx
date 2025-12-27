import React from 'react';
import './ToggleTheme.scss';
import { useTheme } from '../../../contexts/ThemeContext';

const ToggleTheme = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleChange = () => {
    toggleTheme();
  };

  return (
    <div className={`toggle-theme ${className}`}>
      <label className="switch">
        <input 
          type="checkbox" 
          id="toggle" 
          checked={isDarkMode}
          onChange={handleChange}
        />
        <span className="slider">
          <div className="moons-hole">
            <div className="moon-hole" />
            <div className="moon-hole" />
            <div className="moon-hole" />
          </div>
          <div className="black-clouds">
            <div className="black-cloud" />
            <div className="black-cloud" />
            <div className="black-cloud" />
          </div>
          <div className="clouds">
            <div className="cloud" />
            <div className="cloud" />
            <div className="cloud" />
            <div className="cloud" />
            <div className="cloud" />
            <div className="cloud" />
            <div className="cloud" />
          </div>
          <div className="stars">
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
          </div>
        </span>
      </label>
    </div>
  );
};

export default ToggleTheme;
