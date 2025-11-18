import React from "react";
import { Wind, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-12 lg:px-24">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
            <Wind className="text-brand-DEFAULT w-10 h-10" />
            <span className="text-2xl font-bold text-gray-900">
              AirConnect Hanoi
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-DEFAULT focus:ring-2 focus:ring-brand-light outline-none transition bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-DEFAULT focus:ring-2 focus:ring-brand-light outline-none transition bg-gray-50"
              />
              <Eye className="absolute right-4 top-3.5 text-gray-400 w-5 h-5 cursor-pointer" />
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-green-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button className="w-full py-3 bg-brand-light hover:bg-brand-DEFAULT text-gray-900 font-bold rounded-full transition shadow-sm">
            Log In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            New to AirConnect?{" "}
            <Link
              to="/register"
              className="text-gray-900 font-bold hover:underline"
            >
              Create an account
            </Link>
          </p>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 py-2.5 border border-gray-300 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 font-medium text-sm">
              Google
            </button>
            <button className="flex-1 py-2.5 border border-gray-300 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 font-medium text-sm">
              LinkedIn
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block w-[55%] relative">
        <img
          src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover"
          alt="City"
        />
        <div className="absolute inset-0 bg-teal-900/30 mix-blend-multiply"></div>
        <div className="absolute bottom-20 left-12 text-white max-w-xl">
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            Welcome Back to <br /> AirConnect Hanoi
          </h2>
          <p className="text-lg text-gray-100">
            Connecting for Cleaner Air in Hanoi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
