'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, Map, BookOpen, Settings, Bell, Share2, AlertTriangle, CheckCircle } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { apiFetch } from '@/lib/api';
import { AirQualityData, School } from '@/lib/types';
import { ROUTES } from '@/lib/routes';
import { AUTH_KEYS } from '@/lib/auth';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: ROUTES.DASHBOARD_USER },
  { icon: Map, label: 'Map', href: ROUTES.MAP },
  { icon: BookOpen, label: 'Resource Hub', href: ROUTES.RESOURCES },
  { icon: Settings, label: 'Settings', href: ROUTES.DASHBOARD_USER },
];

export default function UserDashboard() {
  const [userName, setUserName] = useState('User');
  const [schoolName, setSchoolName] = useState('');
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const name = localStorage.getItem(AUTH_KEYS.STUDENT_NAME);
    const schoolId = localStorage.getItem(AUTH_KEYS.SCHOOL_ID);
    if (name) setUserName(name);

    if (schoolId) {
      Promise.all([
        apiFetch<AirQualityData>(`/api/air-quality/school/${schoolId}`).catch(() => null),
        apiFetch<School[]>('/api/schools/').catch(() => []),
      ]).then(([aq, schools]) => {
        setAirQuality(aq);
        const school = schools?.find(s => s.id === parseInt(schoolId));
        if (school) setSchoolName(school.name);
      }).catch(console.error).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <DashboardSidebar items={sidebarItems} userName={userName} userRole="Student" showBell={false}>
      <div className="animate-fade-in">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 animate-slide-down">Welcome back, {userName}!</h1>
            <p className="text-gray-500">Here&apos;s your personalized dashboard for today.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white font-bold rounded-full shadow-md hover:bg-green-600 transition-all">
            <Share2 className="w-4 h-4" /> Share your feedback
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in-up">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold text-gray-900">Live Air Quality</h3>
                <span className="text-xs text-gray-400">{airQuality?.measured_at ? `Updated ${new Date(airQuality.measured_at).toLocaleString()}` : 'No data'}</span>
              </div>
              {loading ? <p className="text-center py-8 text-gray-400">Loading...</p> : airQuality ? (
                <>
                  <div className="flex justify-center py-4">
                    <div className="w-36 h-36 rounded-full border-8 border-orange-400 flex items-center justify-center flex-col animate-pulse-slow">
                      <span className="text-4xl font-bold text-orange-500">{airQuality.aqi || 'N/A'}</span>
                      <span className="text-sm font-medium text-orange-600">{airQuality.aqi < 50 ? 'Good' : airQuality.aqi < 100 ? 'Moderate' : 'Unhealthy'}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-center mt-4 text-sm">
                    <div><div className="text-gray-400 text-xs">PM2.5</div><div className="font-bold">{airQuality.pm25 || 'N/A'}</div></div>
                    <div><div className="text-gray-400 text-xs">PM10</div><div className="font-bold">{airQuality.pm10 || 'N/A'}</div></div>
                    <div><div className="text-gray-400 text-xs">Temp</div><div className="font-bold">{airQuality.temp ? `${airQuality.temp}°C` : 'N/A'}</div></div>
                  </div>
                </>
              ) : <p className="text-center py-8 text-gray-400">No air quality data</p>}
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-64 flex flex-col">
              <div className="text-sm text-gray-500">My Contributions</div>
              <div className="text-2xl font-bold">0 Activities</div>
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No contribution data</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="font-bold text-gray-900 mb-4">Activities to Note</h3>
              {airQuality?.aqi ? (
                airQuality.aqi > 100 ? (
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3"><AlertTriangle className="w-6 h-6 text-orange-500 animate-pulse" /><div><div className="font-bold text-orange-800 text-sm">Unhealthy Air Quality</div><div className="text-xs text-orange-700">Limit time spent outdoors.</div></div></div>
                ) : airQuality.aqi > 50 ? (
                  <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3"><AlertTriangle className="w-6 h-6 text-yellow-500" /><div><div className="font-bold text-yellow-800 text-sm">Moderate Air Quality</div><div className="text-xs text-yellow-700">Sensitive groups should reduce outdoor exertion.</div></div></div>
                ) : (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex gap-3"><CheckCircle className="w-6 h-6 text-green-500" /><div><div className="font-bold text-green-800 text-sm">Good Air Quality</div><div className="text-xs text-green-700">Enjoy outdoor activities.</div></div></div>
                )
              ) : <p className="text-center py-8 text-gray-400 text-sm">No air quality data</p>}
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-sm text-gray-500">Trending Topics</div>
              <div className="text-center py-8 text-gray-400 text-sm">No trending topics</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xl">{userName.charAt(0).toUpperCase()}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div><h3 className="font-bold text-lg text-gray-900">{userName}</h3><div className="text-sm text-gray-500">Student</div></div>
                  <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 relative"><Bell className="w-5 h-5 text-gray-600" /><span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" /></button>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="text-sm font-bold text-gray-900 mb-1">School</div>
              <div className="text-xs text-gray-500">{schoolName || 'No school information'}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Recommended for You</h3>
              <div className="text-center py-8 text-gray-400 text-sm">No recommendations available</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">My Bookmarks</h3>
              <div className="text-center py-8 text-gray-400 text-sm">No bookmarks available</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardSidebar>
  );
}
