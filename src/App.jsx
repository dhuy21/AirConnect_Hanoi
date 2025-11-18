import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register"; // <-- Mới
import FeedbackPage from "./pages/FeedbackPage"; // <-- Mới
import MapPage from "./pages/MapPage";
import Resources from "./pages/Resources";

// Dashboard Pages
import SchoolDashboard from "./pages/SchoolDashboard";
import UserDashboard from "./pages/UserDashboard"; // <-- Mới
import NewSubmission from "./pages/NewSubmission"; // <-- Mới

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/resources" element={<Resources />} />

        {/* Private Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Mặc định vào School Dashboard (hoặc UserDashboard tùy logic) */}
          <Route index element={<SchoolDashboard />} />

          {/* Đường dẫn riêng cho User Dashboard để bạn test: /dashboard/user */}
          <Route path="user" element={<UserDashboard />} />

          <Route path="submission" element={<NewSubmission />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
