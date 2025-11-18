import React from "react";
import Header from "../components/Header";
import { Search, PlusCircle } from "lucide-react";

const ResourceCard = ({ type, title, desc, author, date, image, tagColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition group">
    <div className="h-48 overflow-hidden relative">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
      <span
        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${tagColor}`}
      >
        {type}
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-lg text-teal-900 mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-3">{desc}</p>
      <div className="text-xs text-gray-400 pt-4 border-t border-gray-50">
        By {author} | Published {date}
      </div>
    </div>
  </div>
);

const Resources = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <Header />
      <div className="bg-white py-12 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Knowledge Hub: Best Practices for Clean Air
          </h1>
          <p className="text-green-700">
            A central repository for best practices, case studies, research, and
            resources.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100">
            <h3 className="font-bold text-sm mb-4">Facility Type</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-green-500" />{" "}
                School
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-green-500" />{" "}
                Office Building
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-green-500" />{" "}
                Hospital
              </label>
            </div>
          </div>

          <button className="w-full py-3 bg-[#bef264] hover:bg-[#a3e635] text-teal-900 font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm">
            <PlusCircle className="w-5 h-5" /> Contribute Resource
          </button>
        </div>

        {/* Grid Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard
            type="Case Study"
            tagColor="bg-green-100 text-green-800"
            title="Improving Air Quality in Hanoi International School"
            desc="A detailed look at the multi-faceted approach taken to reduce indoor pollutants by 40% using HEPA filters and green walls."
            author="MoET"
            date="Jan 15, 2024"
            image="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop"
          />
          <ResourceCard
            type="Best Practice"
            tagColor="bg-blue-100 text-blue-800"
            title="Optimizing HVAC Systems for Pollutant Filtration"
            desc="Learn about MERV ratings, filter maintenance schedules, and system calibration for cleaner air in large facilities."
            author="ASHRAE Vietnam"
            date="Dec 20, 2023"
            image="https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?q=80&w=2070&auto=format&fit=crop"
          />
          <ResourceCard
            type="Guide"
            tagColor="bg-purple-100 text-purple-800"
            title="A Step-by-Step Manual for Installing Air Quality Sensors"
            desc="An easy-to-follow guide for facility managers to set up a real-time air quality monitoring network."
            author="AirConnect Team"
            date="Oct 18, 2023"
            image="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2070&auto=format&fit=crop"
          />
        </div>
      </div>
    </div>
  );
};

export default Resources;
