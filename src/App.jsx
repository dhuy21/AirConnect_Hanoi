import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout, DashboardLayout } from "./layouts";

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
    case 'dashboard':
      return (
        <DashboardLayout>
          <Component />
        </DashboardLayout>
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
