import React, { useEffect, useState } from "react";
import {
  ClipboardCheck,
  PieChart,
  Clock,
} from "lucide-react";
import { BACKEND_URL } from "../config/env";
import styles from "./SchoolDashboard.module.css";

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{title}</h3>
      <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
    </div>
    <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">{value}</div>
    <div className="text-sm text-gray-500">{subtext}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    "Pending Review": "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };
  const dotColors = {
    "Pending Review": "bg-yellow-500",
    Approved: "bg-green-500",
    Rejected: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColors[status]}`}></span>
      {status}
    </span>
  );
};

const SchoolDashboard = () => {
  const [schoolName, setSchoolName] = useState("School");
  const [submissions, setSubmissions] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolId = localStorage.getItem("school_id");
        if (!schoolId) return;

        const [submissionsRes, airQualityRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/submissions/school/${schoolId}`),
          fetch(`${BACKEND_URL}/api/air-quality/school/${schoolId}`),
        ]);

        if (submissionsRes.ok) {
          const data = await submissionsRes.json();
          setSubmissions(data);
        }

        if (airQualityRes.ok) {
          const data = await airQualityRes.json();
          setAirQuality(data);
        }

        const schoolName = localStorage.getItem("school_name");
        if (schoolName) setSchoolName(schoolName);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsMap = {};
      for (const sub of submissions) {
        try {
          const res = await fetch(
            `${BACKEND_URL}/api/reviews/submission/${sub.id}`
          );
          if (res.ok) {
            const reviewData = await res.json();
            if (reviewData.length > 0) {
              reviewsMap[sub.id] = reviewData[0];
            }
          }
        } catch (error) {
          console.error(`Error fetching review for submission ${sub.id}:`, error);
        }
      }
      setReviews(reviewsMap);
    };

    if (submissions.length > 0) {
      fetchReviews();
    }
  }, [submissions]);

  const approvedCount = Object.values(reviews).filter(
    (r) => r.decision === "accept"
  ).length;
  const pendingCount = submissions.length - Object.keys(reviews).length;
  const approvalRate =
    submissions.length > 0
      ? Math.round((approvedCount / submissions.length) * 100)
      : 0;

  return (
    <div className={styles.animateFadeIn}>
      <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${styles.animateSlideDown}`}>
        Welcome back, {schoolName}!
      </h1>
      <p className={`text-gray-500 mb-8 ${styles.animateSlideDown} ${styles.animationDelay100}`}>
        Here's an overview of your air quality mitigation efforts and submission
        statuses.
      </p>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={styles.animateFadeInUp} style={{ animationDelay: '0ms' }}>
              <StatCard
                title="Total Submissions"
                value={submissions.length}
                subtext="items submitted"
                icon={ClipboardCheck}
                color="text-green-500"
              />
            </div>
            <div className={styles.animateFadeInUp} style={{ animationDelay: '100ms' }}>
              <StatCard
                title="Approval Rate"
                value={`${approvalRate}%`}
                subtext={`${approvedCount} approved`}
                icon={PieChart}
                color="text-blue-500"
              />
            </div>
            <div className={styles.animateFadeInUp} style={{ animationDelay: '200ms' }}>
              <StatCard
                title="Pending Reviews"
                value={pendingCount}
                subtext="items awaiting admin approval"
                icon={Clock}
                color="text-orange-500"
              />
            </div>
          </div>

      {/* Main Layout: Chart & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: AQI (Simplified Mockup) */}
        <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '300ms' }}>
          <div className="flex justify-between mb-6">
            <h3 className="font-bold text-gray-900">
              Live Air Quality - Hanoi
            </h3>
            <span className="text-xs text-gray-400">
              {airQuality?.measured_at
                ? `Updated ${new Date(airQuality.measured_at).toLocaleString()}`
                : "No data"}
            </span>
          </div>
          {airQuality ? (
            <>
              <div className="flex flex-col items-center justify-center py-8 relative">
                <div className={`w-40 h-40 rounded-full border-[12px] border-gray-100 border-t-orange-400 border-r-orange-400 flex items-center justify-center flex-col ${styles.animatePulseSlow} hover:scale-105 transition-transform duration-300`}>
                  <span className="text-4xl font-bold text-orange-500">
                    {airQuality.aqi || "N/A"}
                  </span>
                  <span className="text-sm font-medium text-orange-600">
                    {airQuality.aqi
                      ? airQuality.aqi < 50
                        ? "Good"
                        : airQuality.aqi < 100
                        ? "Moderate"
                        : "Unhealthy"
                      : "No data"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-center mt-4 px-4">
                <div>
                  <div className="text-xs text-gray-500">PM2.5</div>
                  <div className="font-bold">{airQuality.pm25 || "N/A"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">PM10</div>
                  <div className="font-bold">{airQuality.pm10 || "N/A"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Temp</div>
                  <div className="font-bold">
                    {airQuality.temp ? `${airQuality.temp}°C` : "N/A"}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">
              No air quality data available
            </div>
          )}
        </div>

        {/* Right: Submission Table */}
        <div className={`lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 ${styles.animateFadeInUp}`} style={{ animationDelay: '400ms' }}>
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900">
              Submission Status Tracker
            </h3>
            <button className="bg-brand-DEFAULT hover:bg-brand-dark text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-md hover:shadow-lg">
              Share your feedback
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Criterion Updated</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                      No submissions yet
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub) => {
                    const review = reviews[sub.id];
                    const status = review
                      ? review.decision === "accept"
                        ? "Approved"
                        : review.decision === "reject"
                        ? "Rejected"
                        : "Pending Review"
                      : "Pending Review";
                    return (
                      <tr
                        key={sub.id}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {sub.type} - #{sub.id}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {review
                            ? new Date(review.date).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={status} />
                        </td>
                        <td className="px-6 py-4 text-gray-500 italic truncate max-w-xs">
                          {review?.note || "No feedback yet."}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default SchoolDashboard;
