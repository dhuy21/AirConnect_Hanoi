import React, { useEffect, useState } from "react";
import {
  Bell,
  Share2,
  AlertTriangle,
  CheckCircle,
  Bookmark,
} from "lucide-react";
import { BACKEND_URL } from "../config/env";
import styles from "./UserDashboard.module.css";

const UserDashboard = () => {
  const [userName, setUserName] = useState("User");
  const [schoolName, setSchoolName] = useState("");
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = localStorage.getItem("student_name");
        const schoolId = localStorage.getItem("school_id");
        if (name) setUserName(name);

        if (schoolId) {
          const [airQualityRes, schoolsRes] = await Promise.all([
            fetch(`${BACKEND_URL}/api/air-quality/school/${schoolId}`).catch(() => null),
            fetch(`${BACKEND_URL}/api/schools/`).catch(() => null),
          ]);

          if (airQualityRes?.ok) {
            try {
              const data = await airQualityRes.json();
              setAirQuality(data);
            } catch (e) {
              // Air quality not found, leave as null
            }
          }

          if (schoolsRes?.ok) {
            const schools = await schoolsRes.json();
            const school = schools.find((s) => s.id === parseInt(schoolId));
            if (school) setSchoolName(school.name);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.animateFadeIn}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className={`text-3xl font-bold text-gray-900 mb-1 ${styles.animateSlideDown}`}>
            Welcome back, {userName}!
          </h1>
          <p className={`text-gray-500 ${styles.animateSlideDown} ${styles.animationDelay100}`}>
            Here's your personalized dashboard for today.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-white font-bold rounded-full shadow-md hover:bg-green-600 hover:scale-105 active:scale-95 transition-all duration-200">
          <Share2 className="w-4 h-4" /> Share your feedback
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Live AQI */}
          <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '0ms' }}>
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-gray-900">
                Live Air Quality - Hanoi
              </h3>
              <span className="text-xs text-gray-400">
                {airQuality?.measured_at
                  ? `Updated ${new Date(airQuality.measured_at).toLocaleString()}`
                  : "No data"}
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-6 flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>Your
              location
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading...</div>
            ) : (
              <>
                <div className="flex justify-center py-4">
                  <div className={`w-36 h-36 rounded-full border-8 border-orange-400 flex items-center justify-center flex-col ${styles.animatePulseSlow} hover:scale-105 transition-transform duration-300`}>
                    <span className="text-4xl font-bold text-orange-500">
                      {airQuality?.aqi || "N/A"}
                    </span>
                    <span className="text-sm font-medium text-orange-600">
                      {airQuality?.aqi
                        ? airQuality.aqi < 50
                          ? "Good"
                          : airQuality.aqi < 100
                          ? "Moderate"
                          : "Unhealthy"
                        : "No data"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-center mt-4 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs">PM2.5</div>
                    <div className="font-bold">{airQuality?.pm25 || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">PM10</div>
                    <div className="font-bold">{airQuality?.pm10 || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Temp</div>
                    <div className="font-bold">
                      {airQuality?.temp ? `${airQuality.temp}°C` : "N/A"}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* My Contributions Chart */}
          <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-64 flex flex-col hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '100ms' }}>
            <div className="mb-4">
              <div className="text-sm text-gray-500">My Contributions</div>
              <div className="text-2xl font-bold">0 Activities</div>
              <div className="text-xs text-gray-400">No data available</div>
            </div>
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              No contribution data available
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Activities to Note */}
          <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '200ms' }}>
            <h3 className="font-bold text-gray-900 mb-4">
              Activities to Note
              {airQuality?.aqi ? ` (AQI: ${airQuality.aqi})` : ""}
            </h3>

            {airQuality?.aqi ? (
              <>
                {airQuality.aqi > 100 ? (
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-4 flex gap-3 hover:bg-orange-100 transition-colors duration-200">
                    <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 animate-pulse" />
                    <div>
                      <div className="font-bold text-orange-800 text-sm">
                        Unhealthy Air Quality
                      </div>
                      <div className="text-xs text-orange-700 leading-relaxed">
                        Air quality is unhealthy. Limit time spent outdoors.
                      </div>
                    </div>
                  </div>
                ) : airQuality.aqi > 50 ? (
                  <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-4 flex gap-3 hover:bg-yellow-100 transition-colors duration-200">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-yellow-800 text-sm">
                        Moderate Air Quality
                      </div>
                      <div className="text-xs text-yellow-700 leading-relaxed">
                        Sensitive groups should consider reducing prolonged outdoor exertion.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4 flex gap-3 hover:bg-green-100 transition-colors duration-200">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-green-800 text-sm">
                        Good Air Quality
                      </div>
                      <div className="text-xs text-green-700 leading-relaxed">
                        Air quality is satisfactory. Enjoy outdoor activities.
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                No air quality data available
              </div>
            )}
          </div>

          {/* Trending Topics */}
          <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '300ms' }}>
            <div className="mb-4">
              <div className="text-sm text-gray-500">Trending Topics</div>
              <div className="text-xl font-bold">-</div>
              <div className="text-xs text-gray-400">No data available</div>
            </div>
            <div className="text-center py-8 text-gray-400 text-sm">
              No trending topics data available
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '400ms' }}>
            <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xl hover:scale-110 transition-transform duration-200">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {userName}
                  </h3>
                  <div className="text-sm text-gray-500">Student</div>
                </div>
                <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 hover:scale-110 active:scale-95 transition-transform duration-200 relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>
              </div>
            </div>
          </div>

          <div className={`bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-200 ${styles.animateFadeInUp}`} style={{ animationDelay: '500ms' }}>
            <div className="text-sm font-bold text-gray-900 mb-1">School</div>
            <div className="text-xs text-gray-500">
              {schoolName || "No school information"}
            </div>
          </div>

          {/* Recommended for You */}
          <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '600ms' }}>
            <h3 className="font-bold text-gray-900 mb-4">
              Recommended for You
            </h3>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-400 text-sm">
                No recommendations available
              </div>
            </div>
          </div>

          {/* My Bookmarks */}
          <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '700ms' }}>
            <h3 className="font-bold text-gray-900 mb-4">My Bookmarks</h3>
            <div className="space-y-3">
              <div className="text-center py-8 text-gray-400 text-sm">
                No bookmarks available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
