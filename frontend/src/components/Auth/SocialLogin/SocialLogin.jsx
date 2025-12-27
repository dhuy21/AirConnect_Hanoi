import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin, FaFacebook } from 'react-icons/fa';
import styles from './SocialLogin.module.css';

const SocialLogin = ({ onGoogleLogin, onFacebookLogin, onLinkedInLogin }) => {
  return (
    <div className={styles.container}>
      <div className={styles.divider}>
        <div className={styles.dividerLine}></div>
        <span className={styles.dividerText}>OR</span>
        <div className={styles.dividerLine}></div>
      </div>
      
      <div className={styles.buttons}>
        <button 
          onClick={onGoogleLogin}
          className={`${styles.socialButton} ${styles.google}`}
        >
          <FcGoogle size={18} />
          <span>Google</span>
        </button>
        <button 
          onClick={onFacebookLogin}
          className={`${styles.socialButton} ${styles.facebook}`}
        >
          <FaFacebook size={18} />
          <span>Facebook</span>
        </button>
        
        <button 
          onClick={onLinkedInLogin}
          className={`${styles.socialButton} ${styles.linkedin}`}
        >
          <FaLinkedin size={18} />
          <span>LinkedIn</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;

