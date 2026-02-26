import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";
import { BACKEND_URL } from "../config/env";
import styles from "./FeedbackPage.module.css";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.subject.trim()) {
      setError("Subject is required");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Message is required");
      return false;
    }
    if (formData.message.trim().length < 10) {
      setError("Message must be at least 10 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const apiUrl = BACKEND_URL ? `${BACKEND_URL}/api/feedback/` : '/api/feedback/';
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          phone: formData.phone.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to send feedback. Please try again.");
      }

      // Success
      setSuccess(true);
      setFormData({
        full_name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={styles.header}>
            <h1 className={styles.title}>
              Connect With Us
            </h1>
            <p className={styles.subtitle}>
              We'd love to hear from you! Whether you have a question, a
              partnership proposal, or feedback.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className={styles.successMessage}>
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className={styles.successTitle}>
                  Thank you for your feedback!
                </p>
                <p className={styles.successText}>
                  We've received your message and will get back to you soon.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className={styles.errorText}>{error}</p>
            </div>
          )}

          <div className={styles.mainCard}>
            {/* Left: Illustration */}
            <div className={styles.imagePanel}>
              <img
                src="https://images.unsplash.com/photo-1599235934749-c55a3e6f15f9?q=80&w=2070&auto=format&fit=crop"
                alt="Community"
              />
              <div className={styles.imageOverlay}>
                <div>
                  <p className={styles.imageLabel}>Community</p>
                  <h2 className={styles.imageTitle}>
                    Together Against
                    <br />
                    Air Pollution
                  </h2>
                  <p className={styles.imageSubtitle}>
                    AirConnect Hanoi
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className={`p-8 lg:p-12 ${styles.formCard}`}>
              <h2 className={styles.formTitle}>
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="full_name" className={styles.label}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone Number <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="+84 123 456 789"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    className={styles.textarea}
                    placeholder="How can we help? (Minimum 10 characters)"
                  />
                  <p className={`${styles.charCounter} ${formData.message.length < 10 ? styles.error : formData.message.length < 20 ? styles.warning : ''}`}>
                    {formData.message.length} characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitButton}
                >
                  {loading ? (
                    <>
                      <Loader2 className={`w-5 h-5 ${styles.spinner}`} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Footer */}
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className={styles.contactLabel}>Email Address</div>
                <div className={styles.contactValue}>
                  contact@airconnecthanoi.org
                </div>
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className={styles.contactLabel}>Phone Number</div>
                <div className={styles.contactValue}>+84 123 456 789</div>
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className={styles.contactLabel}>Our Address</div>
                <div className={styles.contactValue}>
                  1 Dai Co Viet, Hai Ba Trung, Hanoi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
