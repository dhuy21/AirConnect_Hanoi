import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import Features from "../components/Features";
import Testimonial from "../components/Testimonial";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-green-200">
      <Header />
      <main>
        <Hero />
        <Mission />
        <Features />
        <Testimonial />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;
