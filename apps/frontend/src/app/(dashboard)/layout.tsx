'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isLoggedIn, getUserRole } from '@/lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/auth');
      return;
    }

    const role = getUserRole();
    const roleRouteMap: Record<string, string> = {
      admin: '/dashboard/admin',
      school: '/dashboard/school',
      student: '/dashboard/user',
    };

    if (role && !pathname.startsWith(roleRouteMap[role])) {
      router.replace(roleRouteMap[role]);
      return;
    }

    setAuthorized(true);
  }, [router, pathname]);

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600" />
      </div>
    );
  }

  return <>{children}</>;
}
