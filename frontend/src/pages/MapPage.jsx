import React from "react";
import { Filter, Check, X, XCircle, CheckCircle2 } from "lucide-react";
import { SchoolMap } from "../components";

const MapPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex relative overflow-hidden">
        {/* Filter Sidebar (Floating on Desktop over map or Static) */}
        <aside className="w-80 bg-white shadow-xl z-10 absolute top-4 left-4 bottom-4 rounded-xl overflow-y-auto border border-gray-200 hidden md:block">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6 text-teal-900">
              <Filter className="w-5 h-5" />
              <h2 className="font-bold text-lg">Filter Schools</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  Filter by Criteria
                </h3>
                <div className="space-y-3">
                  {[
                    "Proactive Pollution Responses",
                    "Adapted Facilities",
                    "Air Quality Monitoring",
                    "Respiratory Health Check-ups",
                    "Mask Use Instructions",
                  ].map((item, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={i === 2 || i === 4}
                        className="w-5 h-5 rounded text-brand-DEFAULT focus:ring-brand-light border-gray-300"
                      />
                      <span className="text-sm text-gray-600">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-[#34d399] hover:bg-green-500 text-white font-bold rounded-lg shadow-sm transition">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900">Filter Results</h3>
              <span className="text-xs text-green-600 font-bold">
                18 schools found
              </span>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-green-100 border border-green-200 rounded-lg cursor-pointer">
                <div className="font-bold text-teal-900">
                  Vinschool Times City
                </div>
                <div className="text-xs text-teal-700">
                  458 Minh Khai, Hai Ba Trung
                </div>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="font-bold text-gray-900">
                  Hanoi International School
                </div>
                <div className="text-xs text-gray-500">
                  48 Lieu Giai, Ba Dinh
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Map Area */}
        <div className="flex-1 bg-gray-200 relative md:ml-[22rem] overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <SchoolMap />
          </div>

          {/* Search Bar on Map */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 md:left-96 md:translate-x-0 w-full max-w-md px-4 z-10">
            <input
              type="text"
              placeholder="Search for a school..."
              className="w-full px-5 py-3 rounded-full shadow-lg border border-gray-200 outline-none focus:ring-2 focus:ring-brand-DEFAULT"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MapPage;
