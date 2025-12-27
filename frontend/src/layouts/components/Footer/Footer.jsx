import React from "react";
import { Wind, Linkedin, Twitter, Facebook } from "lucide-react";
import logo from "../../../assets/images/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Logo - Position absolute à gauche sur desktop */}
        <div className="md:absolute md:left-0 flex items-center gap-2">
          <img src={logo} alt="AirConnect Hanoi" className="w-12 h-12" />
          <span className="text-lg font-bold text-teal-900">
            AirConnect Hanoi
          </span>
        </div>

        {/* Links - Centré absolument */}
        <div className="flex gap-8 text-xs text-gray-500 font-medium">
          <div className="hover:text-teal-900 cursor-pointer transition-colors">
            Privacy Policy
          </div>
          <div className="hover:text-teal-900 cursor-pointer transition-colors">
            Terms of Service
          </div>
          <div className="hover:text-teal-900 cursor-pointer transition-colors">
            Contact
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 relative flex flex-col md:flex-row justify-center items-center border-t border-gray-200 pt-8">
        {/* Socials */}
        <div className="absolute left-0 flex gap-4 mb-4 md:mb-0">
          <div className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300">
            <Linkedin className="w-4 h-4 text-gray-700" />
          </div>
          <div className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300">
            <Twitter className="w-4 h-4 text-gray-700" />
          </div>
          <div className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300">
            <Facebook className="w-4 h-4 text-gray-700" />
          </div>
        </div>

        <div className="text-gray-400 text-xs">
          © 2025 AirConnect Hanoi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
