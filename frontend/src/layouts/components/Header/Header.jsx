import React, { useState, useEffect, useRef } from "react";
import routes from "../../../config/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToggleTheme } from "../../../components";
import { LogOut } from "lucide-react";
import { logout, isLoggedIn, getDashboardRoute } from "../../../utils/auth";
import logo from "../../../assets/images/Logo.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const homeRef = useRef(null);
  const dashboardRef = useRef(null);
  const mapRef = useRef(null);
  const resourcesRef = useRef(null);
  const feedbackRef = useRef(null);

  // Update logged in state when location changes
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [location.pathname]);

  const dashboardRoute = getDashboardRoute();

  const handleLogout = () => {
    logout(navigate);
  };

  const navItems = [
    { 
      label: loggedIn ? "Dashboard" : "Home", 
      route: loggedIn ? dashboardRoute : routes.home 
    },
    { label: "Map", route: routes.map },
    { label: "Resources", route: routes.resources },
    { label: "Feedback", route: routes.feedback },
  ];
  
  const navRefs = {
    [routes.home]: homeRef,
    [routes.userDashboard]: dashboardRef,
    [routes.adminDashboard]: dashboardRef,
    [routes.schoolDashboard]: dashboardRef,
    [routes.map]: mapRef,
    [routes.resources]: resourcesRef,
    [routes.feedback]: feedbackRef,
  };

  useEffect(() => {
    const updateIndicator = () => {
      const activeRef = navRefs[location.pathname];
      if (!activeRef?.current) {
        setIndicatorStyle({ left: 0, width: 0 });
        return;
      }

      const container = activeRef.current.parentElement;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeRef.current.getBoundingClientRect();
      
      setIndicatorStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      });
    };

    requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [location.pathname]);

  const isActive = (route) => location.pathname === route;
    
    return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white sticky top-0 z-50 border-b border-gray-100 opacity-90"> 
      <Link to={routes.home} className="flex items-center gap-2 cursor-pointer">
        <img src={logo} alt="AirConnect Hanoi" className="w-12 h-12" />
        <span className="text-xl font-bold text-gray-800 tracking-tight">AirConnect Hanoi</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 relative">
        {navItems.map(({ label, route }) => (
      <Link 
            key={route}
            ref={navRefs[route]}
            to={route}
            className={`px-4 py-1.5 rounded-full relative z-10 transition-colors duration-200 ${
              isActive(route) ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-brand-dark'
            }`}
          >
            {label}
          </Link>
        ))}

        <span
          className="absolute bg-brand-light rounded-full transition-all duration-300 ease-out"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            height: '100%',
            opacity: indicatorStyle.width > 0 ? 1 : 0,
            pointerEvents: 'none',
          }}
        />

        <div className="flex items-center gap-4 ml-4 relative z-10">
          {loggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          )}
          <ToggleTheme/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
