import { LayoutDashboard, FilePlus, BarChart3, Settings } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export const schoolSidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: ROUTES.DASHBOARD_SCHOOL },
  { icon: FilePlus, label: 'New Submission', href: ROUTES.DASHBOARD_SCHOOL_SUBMISSION },
  { icon: BarChart3, label: 'My Progress', href: ROUTES.DASHBOARD_SCHOOL },
  { icon: Settings, label: 'Settings', href: ROUTES.DASHBOARD_SCHOOL },
];
