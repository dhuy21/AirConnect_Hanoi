import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  BarChart3,
  Map,
  MessageSquare,
  BookOpen,
  Settings,
  LogOut,
  Wind,
  Bell,
  User,
} from "lucide-react";

const SidebarItem = ({ icon: Icon, label, to, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? "bg-green-100 text-teal-900 font-semibold"
        : "text-gray-500 hover:bg-gray-50 hover:text-teal-700"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </Link>
);

const DashboardLayout = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <Wind className="text-brand-DEFAULT w-8 h-8" />
          <span className="text-xl font-bold text-gray-800">AirConnect</span>
        </div>

        <div className="flex-1 px-4 space-y-2 mt-4">
          <div className="mb-6">
            <div className="flex items-center gap-3 px-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-white font-bold">
                HS
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Hanoi Int'l School
                </p>
                <p className="text-xs text-gray-500">School User</p>
              </div>
            </div>
          </div>

          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            to="/dashboard"
            active={path === "/dashboard"}
          />
          <SidebarItem
            icon={FilePlus}
            label="New Submission"
            to="/dashboard/submission"
            active={path === "/dashboard/submission"}
          />
          <SidebarItem
            icon={BarChart3}
            label="My Progress"
            to="/dashboard/progress"
          />
          <SidebarItem icon={Map} label="Map" to="/map" />
          <SidebarItem
            icon={MessageSquare}
            label="Community Forum"
            to="/forum"
          />
          <SidebarItem icon={BookOpen} label="Resource Hub" to="/resources" />
          <SidebarItem icon={Settings} label="Settings" to="/settings" />
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {/* Top Header inside Dashboard */}
        <header className="flex justify-end items-center gap-4 mb-8">
          <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
            />
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
