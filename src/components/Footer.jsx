import React from "react";
import { Wind, Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Wind className="text-brand-DEFAULT w-6 h-6" />
          <span className="text-lg font-bold text-teal-900">
            AirConnect Hanoi
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-8 text-xs text-gray-500 font-medium">
          <a href="#" className="hover:text-teal-900">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-teal-900">
            Terms of Service
          </a>
          <a href="#" className="hover:text-teal-900">
            Contact
          </a>
        </div>

        {/* Copyright (Bottom center usually, but simple layout here) */}
      </div>

      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8">
        {/* Socials */}
        <div className="flex gap-4 mb-4 md:mb-0">
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
