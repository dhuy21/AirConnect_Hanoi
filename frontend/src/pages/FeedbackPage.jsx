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
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-teal-50/30 to-white ${styles.container}`}>
      <div className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-teal-900 to-green-700 bg-clip-text text-transparent">
              Connect With Us
            </h1>
            <p className="text-green-700 text-lg max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question, a
              partnership proposal, or feedback.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className={`mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg flex items-center gap-3 shadow-md ${styles.successMessage}`}>
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-semibold">
                  Thank you for your feedback!
                </p>
                <p className="text-green-700 text-sm">
                  We've received your message and will get back to you soon.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3 shadow-md ${styles.errorMessage}`}>
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Left: Illustration */}
            <div className={`lg:w-1/2 bg-gradient-to-br from-teal-500 via-teal-600 to-green-600 relative min-h-[400px] lg:min-h-[600px] ${styles.imagePanel}`}>
              <img
                src="https://images.unsplash.com/photo-1599235934749-c55a3e6f15f9?q=80&w=2070&auto=format&fit=crop"
                alt="Community"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-800/70 to-transparent flex items-end p-8 lg:p-12">
                <div>
                  <p className="text-teal-200 text-sm font-medium mb-4 uppercase tracking-wider">Community</p>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
                    Together Against
                    <br />
                    Air Pollution
                  </h2>
                  <p className="text-green-300 text-xl lg:text-2xl font-semibold mt-2">
                    AirConnect Hanoi
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className={`lg:w-1/2 p-8 lg:p-12 ${styles.formCard}`}>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-teal-900 to-green-700 bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="full_name" className={`block text-sm font-semibold text-gray-700 mb-2 ${styles.label}`}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none ${styles.input}`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-semibold text-gray-700 mb-2 ${styles.label}`}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none ${styles.input}`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={`block text-sm font-semibold text-gray-700 mb-2 ${styles.label}`}>
                    Phone Number <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none ${styles.input}`}
                    placeholder="+84 123 456 789"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-semibold text-gray-700 mb-2 ${styles.label}`}>
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none ${styles.input}`}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-semibold text-gray-700 mb-2 ${styles.label}`}>
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
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition resize-none ${styles.textarea}`}
                    placeholder="How can we help? (Minimum 10 characters)"
                  />
                  <p className={`text-xs mt-2 ${formData.message.length < 10 ? styles.charCounter + ' ' + styles.error : formData.message.length < 20 ? styles.charCounter + ' ' + styles.warning : 'text-gray-500'}`}>
                    {formData.message.length} characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-green-400 disabled:to-green-500 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${styles.submitButton}`}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className={`flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 ${styles.contactCard}`}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center text-green-600 ${styles.contactIcon}`}>
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email Address</div>
                <div className="font-semibold text-teal-900 text-sm">
                  contact@airconnecthanoi.org
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 ${styles.contactCard}`}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center text-green-600 ${styles.contactIcon}`}>
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone Number</div>
                <div className="font-semibold text-teal-900">+84 123 456 789</div>
              </div>
            </div>

            <div className={`flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 ${styles.contactCard}`}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center text-green-600 ${styles.contactIcon}`}>
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Our Address</div>
                <div className="font-semibold text-teal-900 text-sm">
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
