import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageSignin from "../assets/images/Signin.jpeg";
import imageLogin from "../assets/images/Login.jpeg";
import { AuthToggle, LoginForm, RegisterForm, SocialLogin } from "../components";
import routes from "../config/routes";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (formData) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      localStorage.setItem('student_token', data.access_token);
      localStorage.setItem('student_id', data.student_id);
      localStorage.setItem('student_name', data.name);
      navigate(routes.userDashboard);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (formData) => {
    setLoading(true);
    setError("");
    try {
      const schoolId = parseInt(formData.school_id);
      if (!formData.school_id || isNaN(schoolId) || schoolId <= 0) {
        setError("Please select a valid school");
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          birth_date: formData.birth_date,
          sex: formData.sex,
          health_status: formData.health_status,
          school_id: schoolId,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      localStorage.setItem('student_token', data.access_token);
      localStorage.setItem('student_id', data.student_id);
      localStorage.setItem('student_name', data.name);
      navigate(routes.userDashboard);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <div className={`min-h-screen flex bg-white transition-all duration-700 ${isLogin ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Image Section */}
      <div className="hidden lg:block w-[45%] relative overflow-hidden">
        <img
          key={isLogin ? "login" : "register"}
          src={isLogin 
            ? imageLogin
            : imageSignin
          }
          className="w-full h-full object-cover image-fade-in"
          alt="City"
        />
        <div className="absolute bottom-20 left-12 text-white max-w-xl text-fade-in">
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            {isLogin ? "Welcome Back to" : "Join"} AirConnect Hanoi
          </h2>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col px-12 lg:px-24 py-12 overflow-y-auto">
        {/* Toggle Tabs */}
        <AuthToggle isLogin={isLogin} onToggle={setIsLogin} />

        {/* Logo & Title */}
        <div className="mb-8 text-fade-in">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>
          {!isLogin ? (
            <p className="text-gray-500">
              Connect with facility managers and improve Hanoi's air quality.
            </p>
          ) : (
            <p className="text-gray-500">
              Join us and improve Hanoi's air quality.
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Forms */}
        <div key={isLogin ? 'login' : 'register'}>
          {isLogin ? (
            <LoginForm onSubmit={handleLoginSubmit} loading={loading} />
          ) : (
            <RegisterForm onSubmit={handleRegisterSubmit} loading={loading} />
          )}
        </div>

        {/* Social Login */}
        <SocialLogin 
          onGoogleLogin={() => handleSocialLogin('Google')}
          onFacebookLogin={handleFacebookLogin}
          onLinkedInLogin={() => handleSocialLogin('LinkedIn')}
        />
      </div>
    </div>
  );
};

export default AuthPage;
