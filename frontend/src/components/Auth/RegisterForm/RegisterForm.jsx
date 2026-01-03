import React, { useState, useEffect } from 'react';
import styles from './RegisterForm.module.css';
import Search from './Search';
import { BACKEND_URL } from '../../../config/env';

const RegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birth_date: '',
    sex: 'male',
    health_status: 'Normal',
    school_id: '',
    password: '',
    confirmPassword: '',
  });
  const [schools, setSchools] = useState([]);
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/schools`)
      .then(res => res.json())
      .then(data => setSchools(data))
      .catch(err => console.error('Error fetching schools:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!formData.school_id) {
      alert('Please select a school');
      return;
    }
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} form-slide-right`}>
      <div className={styles.gridTwo}>
        <div className={styles.formGroup}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First name"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last name"
            className={styles.input}
            required
          />
        </div>
      </div>

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

      <div className={styles.gridTwo}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Birth Date</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
      </div>

      <div className={styles.gridTwo}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Gender</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Health Status</label>
          <input
            type="text"
            name="health_status"
            value={formData.health_status}
            onChange={handleChange}
            placeholder="Health status"
            className={styles.input}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>School</label>
          <Search schools={schools} 
                  name="school_id"
                  value={formData.school_id}
                  onChange={handleChange}
                  className={styles.input}
                  required
          />
      </div>

      <div className={styles.gridTwo}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
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
            placeholder="Confirm password"
            className={styles.input}
            required
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegisterForm;

