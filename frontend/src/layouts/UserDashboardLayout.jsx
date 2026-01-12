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

const UserDashboardLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const studentName = localStorage.getItem("student_name") || "User";
  const studentInitial = studentName.charAt(0).toUpperCase();

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
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
                {studentInitial}
            </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                    {studentName}
                </p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
          </div>

          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            to={routes.userDashboard}
            active={path === routes.userDashboard}
          />
          <SidebarItem 
            icon={Map} 
            label="Map" 
            to={routes.map} 
            active={path === routes.map} 
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
            to={routes.userDashboard}
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
        {children}
      </main>
    </div>
  );
};

export default UserDashboardLayout;


