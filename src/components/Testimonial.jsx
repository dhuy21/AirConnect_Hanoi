import React from "react";

const Testimonial = () => {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-900 mb-2">
          Trusted by Leaders
        </h2>
        <p className="text-gray-500 mb-10">
          See what facility managers in Hanoi are saying about AirConnect.
        </p>

        <div className="bg-green-50/80 rounded-3xl p-12 relative">
          {/* Dấu ngoặc kép cách điệu */}
          <div className="text-green-400 text-6xl font-serif absolute top-6 left-0 w-full text-center opacity-50">
            “
          </div>

          <blockquote className="relative z-10 mt-4">
            <p className="text-xl md:text-2xl text-teal-800 italic font-medium leading-relaxed">
              "AirConnect has been a game-changer. The shared knowledge and
              real-time data have allowed us to be proactive, not reactive,
              about air quality."
            </p>
            <footer className="mt-6">
              <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold">
                Senior Facility Manager, TechCorp Towers
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
