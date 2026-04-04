'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut, Bell, Menu, X, LucideIcon } from 'lucide-react';
import { logout } from '@/lib/auth';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  userName: string;
  userRole: string;
  avatarColor?: string;
  children: React.ReactNode;
  showBell?: boolean;
}

export default function DashboardSidebar({ items, userName, userRole, avatarColor = 'bg-teal-600', children, showBell = true }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.length >= 2 ? name.substring(0, 2).toUpperCase() : name.charAt(0).toUpperCase();
  };

  const sidebarContent = (
    <>
      <div className="p-6 flex items-center gap-2">
        <Image src="/images/Logo.png" alt="AirConnect Hanoi" width={48} height={48} style={{ width: 'auto', height: 'auto' }} />
        <span className="text-xl font-bold text-gray-800">AirConnect</span>
      </div>

      <div className="flex-1 px-4 space-y-2 mt-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 px-4 mb-4">
            <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold`}>
              {getInitials(userName)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          </div>
        </div>

        {items.map(({ icon: Icon, label, href }) => (
          <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === href ? 'bg-green-100 text-teal-900 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-teal-700'}`}>
            <Icon className="w-5 h-5" /><span>{label}</span>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
          <LogOut className="w-5 h-5" /><span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white flex flex-col z-50">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      <main className="flex-1 md:ml-64 p-4 sm:p-8">
        <header className="flex justify-between items-center gap-4 mb-8">
          <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1" />
          {showBell && (
            <div className="flex items-center gap-4">
              <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold`}>
                {getInitials(userName)}
              </div>
            </div>
          )}
        </header>
        {children}
      </main>
    </div>
  );
}
