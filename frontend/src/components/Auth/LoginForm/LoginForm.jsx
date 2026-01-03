import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './LoginForm.module.css';

const LoginForm = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} form-slide-left`}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <div className={styles.passwordField}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={styles.input}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeButton}
          >
            {showPassword ? (
              <EyeOff className={styles.eyeIcon} />
            ) : (
              <Eye className={styles.eyeIcon} />
            )}
          </button>
        </div>
      </div>

      <div className={styles.forgotPassword}>
        <a href="#" className={styles.forgotLink}>
          Forgot Password?
        </a>
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;

