import React from "react";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import Features from "../components/Features";
import Testimonial from "../components/Testimonial";
import CallToAction from "../components/CallToAction";

const HomePage = () => {
  return (
    <div className="bg-white font-sans text-gray-900 selection:bg-green-200">
      <Hero />
      <Mission />
      <Features />
      <Testimonial />
      <CallToAction />
    </div>
  );
};

export default HomePage;
