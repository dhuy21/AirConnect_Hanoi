import React from "react";
import routes from "../../../config/routes";
import { Link } from "react-router-dom";
import { PopButton, ToggleTheme } from "../../../components";
import logo from "../../../assets/images/Logo.png";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white sticky top-0 z-50 border-b border-gray-100 opacity-90"> 
      {/* Logo */}
      <Link to={routes.home} className="flex items-center gap-2 cursor-pointer">
        <img src={logo} alt="AirConnect Hanoi" className="w-12 h-12" />
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          AirConnect Hanoi
        </span>
      </Link>

      {/* Navigation - Hidden on mobile, visible on md+ */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link to={routes.home} className="px-4 py-1.5 bg-brand-light rounded-full text-gray-900 font-semibold">
          Home
        </Link>

        <Link to={routes.map} className="hover:text-brand-dark transition">
          Map
        </Link>

        <Link to={routes.resources} className="hover:text-brand-dark transition">
          Resources
        </Link>

        <Link to={routes.feedback} className="hover:text-brand-dark transition">
          Feedback
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <ToggleTheme/>
        </div>
        
      </nav>

      
    </header>
  );
};

export default Header;
