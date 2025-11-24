import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

