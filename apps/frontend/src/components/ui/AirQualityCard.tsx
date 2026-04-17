'use client';

import type { AirQuality } from '@airconnect/shared-types/api';

interface AirQualityCardProps {
  airQuality: AirQuality | null;
  loading?: boolean;
}

function getAqiLabel(aqi: number): string {
  if (aqi < 50) return 'Good';
  if (aqi < 100) return 'Moderate';
  return 'Unhealthy';
}

function getAqiBorderColor(aqi: number): string {
  if (aqi < 50) return 'border-green-400';
  if (aqi < 100) return 'border-orange-400';
  return 'border-red-400';
}

function getAqiTextColor(aqi: number): string {
  if (aqi < 50) return 'text-green-500';
  if (aqi < 100) return 'text-orange-500';
  return 'text-red-500';
}

export default function AirQualityCard({ airQuality, loading }: AirQualityCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between mb-6">
        <h3 className="font-bold text-gray-900">Live Air Quality - Hanoi</h3>
        <span className="text-xs text-gray-400">
          {airQuality?.measured_at
            ? `Updated ${new Date(airQuality.measured_at).toLocaleString()}`
            : 'No data'}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : airQuality ? (
        <>
          <div className="flex flex-col items-center py-8">
            <div className={`w-40 h-40 rounded-full border-[12px] border-gray-100 ${getAqiBorderColor(airQuality.aqi)} flex items-center justify-center flex-col animate-pulse-slow`}>
              <span className={`text-4xl font-bold ${getAqiTextColor(airQuality.aqi)}`}>
                {airQuality.aqi}
              </span>
              <span className={`text-sm font-medium ${getAqiTextColor(airQuality.aqi)}`}>
                {getAqiLabel(airQuality.aqi)}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-center mt-4 px-4">
            <div>
              <div className="text-xs text-gray-500">PM2.5</div>
              <div className="font-bold">{airQuality.pm25 ?? 'N/A'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">PM10</div>
              <div className="font-bold">{airQuality.pm10 ?? 'N/A'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Temp</div>
              <div className="font-bold">{airQuality.temp ? `${airQuality.temp}°C` : 'N/A'}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-400">No air quality data available</div>
      )}
    </div>
  );
}
