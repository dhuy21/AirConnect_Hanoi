'use client';

import Image from 'next/image';
import { Globe, Mail, Link2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="md:absolute md:left-0 flex items-center gap-2">
          <Image src="/images/Logo.png" alt="AirConnect Hanoi" width={48} height={48} />
          <span className="text-lg font-bold text-teal-900">AirConnect Hanoi</span>
        </div>
        <div className="flex gap-8 text-xs text-gray-500 font-medium">
          <span className="hover:text-teal-900 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-teal-900 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-teal-900 cursor-pointer transition-colors">Contact</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 relative flex flex-col md:flex-row justify-center items-center border-t border-gray-200 pt-8">
        <div className="absolute left-0 flex gap-4 mb-4 md:mb-0">
          {[Link2, Globe, Mail].map((Icon, i) => (
            <div key={i} className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300">
              <Icon className="w-4 h-4 text-gray-700" />
            </div>
          ))}
        </div>
        <div className="text-gray-400 text-xs">© {new Date().getFullYear()} AirConnect Hanoi. All rights reserved.</div>
      </div>
    </footer>
  );
}
