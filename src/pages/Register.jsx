import React from "react";
import { Wind, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image (Đảo ngược so với Login) */}
      <div className="hidden lg:block w-[45%] relative">
        <img
          src="https://images.unsplash.com/photo-1596464105751-848d92e074c2?q=80&w=1976&auto=format&fit=crop"
          className="w-full h-full object-cover"
          alt="Green City"
        />
        <div className="absolute inset-0 bg-teal-900/20 mix-blend-multiply"></div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-12 lg:px-24 py-12 overflow-y-auto">
        <div className="flex justify-end mb-8">
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="px-4 py-2 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition ml-2"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-500">
            Connect with facility managers and improve Hanoi's air quality.
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="flex-1 py-2.5 border border-gray-300 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 font-medium text-sm">
            Google
          </button>
          <button className="flex-1 py-2.5 border border-gray-300 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 font-medium text-sm">
            LinkedIn
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-light outline-none bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-light outline-none bg-gray-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                You are
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-light outline-none bg-gray-50">
                <option>Student</option>
                <option>Facility Manager</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                You work at
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-light outline-none bg-gray-50">
                <option>Office Building</option>
                <option>School</option>
                <option>Hospital</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-light outline-none bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-light outline-none bg-gray-50"
              />
            </div>
          </div>

          <button className="w-full py-3 bg-[#84cc16] hover:bg-green-600 text-white font-bold rounded-full transition shadow-lg mt-4">
            Create Account
          </button>

          <p className="text-xs text-center text-gray-400 mt-4">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-green-600">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
