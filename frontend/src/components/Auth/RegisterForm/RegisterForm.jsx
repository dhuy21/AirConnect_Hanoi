import React, { useState } from 'react';
import styles from './RegisterForm.module.css';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Student',
    workplace: 'Office Building',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} form-slide-right`}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.gridTwo}>
        <div className={styles.formGroup}>
          <label className={styles.label}>You are</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.input}
          >
            <option>Student</option>
            <option>Facility Manager</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>You work at</label>
          <select
            name="workplace"
            value={formData.workplace}
            onChange={handleChange}
            className={styles.input}
          >
            <option>Office Building</option>
            <option>School</option>
            <option>Hospital</option>
          </select>
        </div>
      </div>

      <div className={styles.gridTwo}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={styles.input}
            required
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Create Account
      </button>

      <p className={styles.terms}>
        By creating an account, you agree to our{' '}
        <a href="#" className={styles.link}>Terms of Service</a>{' '}
        and{' '}
        <a href="#" className={styles.link}>Privacy Policy</a>
      </p>
    </form>
  );
};

export default RegisterForm;

