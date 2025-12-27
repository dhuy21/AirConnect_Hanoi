import React from "react";
import {
  Bell,
  Share2,
  AlertTriangle,
  CheckCircle,
  Bookmark,
} from "lucide-react";

const UserDashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Welcome back, User!
          </h1>
          <p className="text-gray-500">
            Here's your personalized dashboard for today.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-white font-bold rounded-full shadow-md hover:bg-green-600 transition">
          <Share2 className="w-4 h-4" /> Share your feedback
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Live AQI */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-gray-900">
                Live Air Quality - Hanoi
              </h3>
              <span className="text-xs text-gray-400">Updated 2 mins ago</span>
            </div>
            <div className="text-xs text-gray-500 mb-6 flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>Your
              location
            </div>

            <div className="flex justify-center py-4">
              <div className="w-36 h-36 rounded-full border-8 border-orange-400 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-orange-500">89</span>
                <span className="text-sm font-medium text-orange-600">
                  Moderate
                </span>
              </div>
            </div>
            <div className="flex justify-between text-center mt-4 text-sm">
              <div>
                <div className="text-gray-400 text-xs">PM2.5</div>
                <div className="font-bold">29.8</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs">O3</div>
                <div className="font-bold">45 ppb</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs">NO2</div>
                <div className="font-bold">12 ppb</div>
              </div>
            </div>
          </div>

          {/* My Contributions Chart (Mockup) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-64 flex flex-col">
            <div className="mb-4">
              <div className="text-sm text-gray-500">My Contributions</div>
              <div className="text-2xl font-bold">57 Activities</div>
              <div className="text-xs text-green-500">Last 30 Days ↑12%</div>
            </div>
            {/* CSS Chart Placeholder */}
            <div className="flex-1 flex items-end gap-2 mt-4">
              {[40, 60, 45, 70, 50, 80, 65, 90, 55].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-green-100 rounded-t-md relative group"
                >
                  <div
                    className="absolute bottom-0 w-full bg-green-400 rounded-t-md transition-all duration-500 group-hover:bg-green-500"
                    style={{ height: "100%" }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Activities to Note */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">
              Activities to Note (AQI: 89)
            </h3>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-4 flex gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <div className="font-bold text-orange-800 text-sm">
                  Sensitive Groups
                </div>
                <div className="text-xs text-orange-700 leading-relaxed">
                  Considering reducing prolonged or heavy exertion outdoors.
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      Recommendation {i}
                    </div>
                    <div className="text-xs text-gray-500">
                      Recommendation detail for user at his location goes here.
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-green-600 text-sm font-bold mt-6 hover:underline">
              See all recommendations
            </button>
          </div>

          {/* Trending Topics */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="mb-4">
              <div className="text-sm text-gray-500">Trending Topics</div>
              <div className="text-xl font-bold">HVAC Filters</div>
              <div className="text-xs text-green-500">This Week ↑5%</div>
            </div>
            <div className="space-y-3">
              {["HVAC", "Plants", "Cleaning", "Ventilation"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="w-16 text-gray-500">{item}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${80 - i * 10}%` }}
                      className="h-full bg-brand-DEFAULT rounded-full"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="w-16 h-16 rounded-full"
              alt="User"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    User Nguyen
                  </h3>
                  <div className="text-sm text-gray-500">Student</div>
                </div>
                <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="text-sm font-bold text-gray-900 mb-1">Work at</div>
            <div className="text-xs text-gray-500">
              at Hanoi International School
            </div>
          </div>

          {/* Recommended for You */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">
              Recommended for You
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Case Study: Improving Office Ventilation",
                  type: "Resource Hub",
                },
                {
                  title: "Discussion: Best Indoor Plants",
                  type: "Community Forum",
                },
                {
                  title: "Choosing the Right MERV Rating",
                  type: "Resource Hub",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="pb-3 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded"
                >
                  <div className="font-bold text-sm text-gray-800 leading-tight mb-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-400">{item.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* My Bookmarks */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">My Bookmarks</h3>
            <div className="space-y-3">
              {[
                "Guide to Air Purifier Technologies",
                "Sensor Placement Best Practices",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:text-green-600"
                >
                  <Bookmark className="w-4 h-4 text-gray-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
