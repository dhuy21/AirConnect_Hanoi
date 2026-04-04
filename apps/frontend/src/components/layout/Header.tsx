'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { isLoggedIn, getDashboardRoute, logout } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';

export default function Header() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [pathname]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const dashboardRoute = loggedIn ? getDashboardRoute() : ROUTES.HOME;

  const navItems = [
    { label: loggedIn ? 'Dashboard' : 'Home', route: loggedIn ? dashboardRoute : ROUTES.HOME },
    { label: 'Map', route: ROUTES.MAP },
    { label: 'Resources', route: ROUTES.RESOURCES },
    { label: 'Feedback', route: ROUTES.FEEDBACK },
  ];

  useEffect(() => {
    const updateIndicator = () => {
      const match = navItems.find(n => n.route === pathname);
      const activeEl = match ? linkRefs.current[match.route] : null;
      if (!activeEl || !navRef.current) { setIndicatorStyle({ left: 0, width: 0 }); return; }
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      setIndicatorStyle({ left: elRect.left - navRect.left, width: elRect.width });
    };
    requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [pathname, loggedIn]);

  return (
    <header className="w-full py-4 px-6 bg-white sticky top-0 z-50 border-b border-gray-100 opacity-90">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/Logo.png" alt="AirConnect Hanoi" width={48} height={48} />
          <span className="text-xl font-bold text-gray-800 tracking-tight">AirConnect Hanoi</span>
        </Link>

        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <nav ref={navRef} className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 relative">
          {navItems.map(({ label, route }) => (
            <Link key={route} href={route} ref={el => { linkRefs.current[route] = el; }}
              className={`px-4 py-1.5 rounded-full relative z-10 transition-colors duration-200 ${pathname === route ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-teal-700'}`}>
              {label}
            </Link>
          ))}
          <span className="absolute bg-teal-100 rounded-full transition-all duration-300 ease-out" style={{ left: indicatorStyle.left, width: indicatorStyle.width, height: '100%', opacity: indicatorStyle.width > 0 ? 1 : 0, pointerEvents: 'none' }} />
          {loggedIn && (
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-4 relative z-10">
              <LogOut className="w-4 h-4" /><span className="hidden lg:inline">Logout</span>
            </button>
          )}
        </nav>
      </div>

      {mobileOpen && (
        <nav className="md:hidden mt-4 pb-2 border-t border-gray-100 pt-4 flex flex-col gap-2">
          {navItems.map(({ label, route }) => (
            <Link key={route} href={route} className={`px-4 py-3 rounded-lg transition-colors ${pathname === route ? 'bg-teal-50 text-teal-900 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
              {label}
            </Link>
          ))}
          {loggedIn && (
            <button onClick={logout} className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
