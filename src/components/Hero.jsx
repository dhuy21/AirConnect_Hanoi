import React from "react";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
      {/* Text Content */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-teal-900 leading-tight">
          Breathe Easier, <br />
          <span className="text-teal-800">Together.</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-md leading-relaxed">
          The collaborative hub for Hanoi's facility managers to share best
          practices and combat air pollution in our city.
        </p>

        <div className="flex gap-4 pt-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition">
            <Sparkles className="w-4 h-4" />
            Get started
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition shadow-sm">
            Learn More
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex-1 w-full">
        <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-video">
          {/* Placeholder cho ảnh Tháp Rùa trong hình */}
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop"
            alt="Hanoi Turtle Tower"
            className="w-full h-full object-cover hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
