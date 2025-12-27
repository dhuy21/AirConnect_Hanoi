import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout, SchoolDashboardLayout, AdminDashboardLayout, UserDashboardLayout } from "./layouts";

// Import routes configuration
import { publicRoutes, privateRoutes } from "./routes/routes";

// Helper function to wrap component with layout
const getLayoutWrapper = (Component, layoutType) => {
  switch (layoutType) {
    case 'default':
      return (
        <DefaultLayout>
          <Component />
        </DefaultLayout>
      );
    case 'SchoolDashboardLayout':
      return (
        <SchoolDashboardLayout>
          <Component />
        </SchoolDashboardLayout>
      );
    case 'AdminDashboardLayout':
      return (
        <AdminDashboardLayout>
          <Component />
        </AdminDashboardLayout>
      );
    case 'UserDashboardLayout':
      return (
        <UserDashboardLayout>
          <Component />
        </UserDashboardLayout>
      );
    case null:
    default:
      return <Component />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route
            key={`public-${index}`}
            path={route.path}
            element={getLayoutWrapper(route.component, route.layout)}
          />
        ))}

        {/* Private Routes */}
        {privateRoutes.map((route, index) => (
          <Route
            key={`private-${index}`}
            path={route.path}
            element={getLayoutWrapper(route.component, route.layout)}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
