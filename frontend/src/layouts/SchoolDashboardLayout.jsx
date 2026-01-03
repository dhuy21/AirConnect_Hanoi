import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import routes from "../config/routes";
import {
  LayoutDashboard,
  FilePlus,
  BarChart3,
  Map,
  MessageSquare,
  BookOpen,
  Settings,
  LogOut,
  Bell
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

const SchoolDashboardLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const schoolName = localStorage.getItem("school_name") || "School";
  
  // Get initials from school name (first 2 letters)
  const getInitials = (name) => {
    if (!name || name.trim().length === 0) return "SC";
    const words = name.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    if (name.length >= 2) {
      return name.substring(0, 2).toUpperCase();
    }
    return name.charAt(0).toUpperCase() + name.charAt(0).toUpperCase();
  };
  const schoolInitials = getInitials(schoolName);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <img src={logo} alt="AirConnect Hanoi" className="w-12 h-12" />
          <span className="text-xl font-bold text-gray-800">AirConnect</span>
        </div>

        <div className="flex-1 px-4 space-y-2 mt-4">
          <div className="mb-6">
            <div className="flex items-center gap-3 px-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-white font-bold">
                {schoolInitials}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {schoolName}
                </p>
                <p className="text-xs text-gray-500">School User</p>
              </div>
            </div>
          </div>

          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            to={routes.schoolDashboard}
            active={path === routes.schoolDashboard}
          />
          <SidebarItem
            icon={FilePlus}
            label="New Submission"
            to={routes.newSubmission}
            active={path === routes.newSubmission}
          />
          <SidebarItem
            icon={BarChart3}
            label="My Progress"
            to={routes.schoolDashboard}
            //active={path === routes.schoolDashboard}
          />
          <SidebarItem 
            icon={Map} 
            label="Map" 
            to={routes.map} 
            active={path === routes.map} 
          />
          <SidebarItem
            icon={MessageSquare}
            label="Community Forum"
            to={routes.feedback}
            active={path === routes.feedback}
          />
          <SidebarItem
            icon={BookOpen}
            label="Resource Hub"
            to={routes.resources}
            active={path === routes.resources}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            to={routes.schoolDashboard}
            //active={path === routes.userDashboard}
          />
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
          <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-white font-bold">
            {schoolInitials}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default SchoolDashboardLayout;
