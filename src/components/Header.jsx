import React from "react";
import { Wind, Sun } from "lucide-react"; // Icon gió cho logo

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white sticky top-0 z-50 border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <Wind className="text-brand-DEFAULT w-8 h-8" />
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          AirConnect Hanoi
        </span>
      </div>

      {/* Navigation - Hidden on mobile, visible on md+ */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <a
          href="#"
          className="px-4 py-1.5 bg-brand-light rounded-full text-gray-900 font-semibold"
        >
          Home
        </a>
        <a href="#" className="hover:text-brand-dark transition">
          About us
        </a>
        <a href="#" className="hover:text-brand-dark transition">
          Schools forum
        </a>
        <a href="#" className="hover:text-brand-dark transition">
          Map
        </a>
        <a href="#" className="hover:text-brand-dark transition">
          Feedback
        </a>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 text-blue-600">
          <Sun className="w-5 h-5" />
        </button>
        <button className="hidden sm:block px-6 py-2 border border-gray-400 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
          SIGN IN
        </button>
        <button className="px-6 py-2 bg-brand-light rounded-full text-sm font-bold text-gray-900 hover:bg-brand-DEFAULT transition shadow-sm">
          JOIN US
        </button>
      </div>
    </header>
  );
};

export default Header;
