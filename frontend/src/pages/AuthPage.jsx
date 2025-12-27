import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wind } from "lucide-react";
import imageSignin from "../assets/images/Signin.jpeg";
import imageLogin from "../assets/images/Login.jpeg";
import { AuthToggle, LoginForm, RegisterForm, SocialLogin } from "../components";
import routes from "../config/routes";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSubmit = (formData) => {
    console.log("Login:", formData);
    if(formData.email === "admin@gmail.com" && formData.password === "azerty") {
      navigate(routes.adminDashboard);
    } else if(formData.email === "school@gmail.com" && formData.password === "azerty") {
      navigate(routes.schoolDashboard);
    } else {
      navigate(routes.userDashboard);
    }
  };

  const handleRegisterSubmit = (formData) => {
    console.log("Register:", formData);
    // TODO: Implement register logic
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
    // TODO: Implement social login
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // TODO: Implement Facebook login
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

        {/* Forms */}
        <div key={isLogin ? 'login' : 'register'}>
          {isLogin ? (
            <LoginForm onSubmit={handleLoginSubmit} />
          ) : (
            <RegisterForm onSubmit={handleRegisterSubmit} />
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
